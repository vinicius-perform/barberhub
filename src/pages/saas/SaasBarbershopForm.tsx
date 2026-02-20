import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

export default function SaasBarbershopForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        ownerName: '',
        barbershopName: '',
        slug: '',
        email: '',
        phone: '',
        address: '',
        plan: 'mensal',
        generatePassword: true,
        password: '' // If not auto-generated
    });

    const handleGenerateSlug = (name: string) => {
        const slug = name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphen
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
        setFormData(prev => ({ ...prev, slug: slug + '-' + Math.floor(Math.random() * 1000) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const password = formData.generatePassword
                ? Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
                : formData.password;

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('No session');

            // Call Edge Function
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create_barbershop_owner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    email: formData.email,
                    password,
                    ownerName: formData.ownerName,
                    barbershopName: formData.barbershopName,
                    slug: formData.slug,
                    phone: formData.phone,
                    address: formData.address,
                    plan: formData.plan
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao criar barbearia');
            }

            alert(`Barbearia criada com sucesso!\n\nEmail: ${formData.email}\nSenha: ${password}\n\nCOPIE A SENHA AGORA!`);
            navigate('/saas/dashboard');

        } catch (error: any) {
            console.error(error);
            alert(error.message || 'Erro ao criar barbearia');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/saas/dashboard')}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-500 dark:text-gray-400" />
                </button>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Nova Barbearia</h1>
            </div>

            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Owner Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
                                Responsável
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Nome Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.ownerName}
                                    onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email (Login)</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>
                        </div>

                        {/* Barbershop Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
                                Barbearia
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Nome da Barbearia</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.barbershopName}
                                    onChange={e => {
                                        setFormData({ ...formData, barbershopName: e.target.value });
                                        if (!formData.slug) handleGenerateSlug(e.target.value);
                                    }}
                                    className="w-full bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Slug (URL)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">WhatsApp</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Plano de Assinatura</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'mensal' ? 'border-primary-500 bg-primary-500/10' : 'border-slate-200 dark:border-white/10'}`}>
                                <input
                                    type="radio"
                                    name="plan"
                                    value="mensal"
                                    checked={formData.plan === 'mensal'}
                                    onChange={e => setFormData({ ...formData, plan: e.target.value })}
                                    className="hidden"
                                />
                                <div className="font-semibold text-slate-900 dark:text-white">Mensal</div>
                                <div className="text-sm text-slate-500 dark:text-gray-400">R$ 99,90/mês</div>
                            </label>

                            <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'trimestral' ? 'border-secondary-500 bg-secondary-500/10' : 'border-slate-200 dark:border-white/10'}`}>
                                <input
                                    type="radio"
                                    name="plan"
                                    value="trimestral"
                                    checked={formData.plan === 'trimestral'}
                                    onChange={e => setFormData({ ...formData, plan: e.target.value })}
                                    className="hidden"
                                />
                                <div className="font-semibold text-slate-900 dark:text-white">Trimestral</div>
                                <div className="text-sm text-slate-500 dark:text-gray-400">R$ 149,90/ciclo</div>
                            </label>

                            <label className={`border rounded-xl p-4 cursor-pointer transition-all ${formData.plan === 'semestral' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-200 dark:border-white/10'}`}>
                                <input
                                    type="radio"
                                    name="plan"
                                    value="semestral"
                                    checked={formData.plan === 'semestral'}
                                    onChange={e => setFormData({ ...formData, plan: e.target.value })}
                                    className="hidden"
                                />
                                <div className="font-semibold text-slate-900 dark:text-white">Semestral</div>
                                <div className="text-sm text-slate-500 dark:text-gray-400">R$ 249,90/ciclo</div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary-500/20 flex items-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                            Criar Barbearia
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
