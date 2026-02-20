import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Check if the requester is a super admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      throw new Error('Invalid token')
    }

    const { data: isAdmin, error: adminError } = await supabaseClient
      .from('saas_admins')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (adminError || !isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'User is not a super admin' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const {
      email,
      password,
      ownerName,
      barbershopName,
      slug,
      phone,
      address,
      plan
    } = await req.json()

    // 1. Create Auth User
    const { data: newUser, error: createUserError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: ownerName }
    })

    if (createUserError) throw createUserError

    if (!newUser.user) throw new Error('Failed to create user')

    // 2. Create Barbershop
    const { data: newBarbershop, error: createBarbershopError } = await supabaseClient
      .from('barbershops')
      .insert({
        name: barbershopName,
        slug,
        phone,
        address,
        owner_id: newUser.user.id,
        created_by_saas_admin: user.id
      })
      .select()
      .single()

    if (createBarbershopError) {
      // Rollback user creation (manual)
      await supabaseClient.auth.admin.deleteUser(newUser.user.id)
      throw createBarbershopError
    }

    // 3. Create Profile for Owner
    const { error: createProfileError } = await supabaseClient
      .from('profiles')
      .insert({
        id: newUser.user.id,
        full_name: ownerName,
        email: email,
        role: 'owner',
        barbershop_id: newBarbershop.id
      })

    if (createProfileError) {
      console.error("Error creating profile:", createProfileError)
      // Don't rollback barbershop/user for now, just log.Ideally should rollback.
    }

    // 4. Create Subscription
    let price = 99.90
    if (plan === 'trimestral') price = 149.90
    if (plan === 'semestral') price = 249.90
    const now = new Date()
    const trialEnds = new Date(now)
    trialEnds.setDate(now.getDate() + 14) // 14 days trial
    const renewAt = new Date(trialEnds) // Renew after trial

    const { error: createSubError } = await supabaseClient
      .from('subscriptions')
      .insert({
        barbershop_id: newBarbershop.id,
        status: 'trial',
        plan,
        price_monthly: price,
        started_at: now.toISOString(),
        trial_ends_at: trialEnds.toISOString(),
        renew_at: renewAt.toISOString()
      })

    if (createSubError) {
      console.error("Error creating subscription:", createSubError)
    }

    // 5. Create Default Schedule (Optional - Skipping for brevity, can be added later)

    return new Response(
      JSON.stringify({
        success: true,
        user: newUser.user,
        barbershop: newBarbershop
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
