import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SaasLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (signInError) throw signInError;
            if (!user) throw new Error('Erro ao autenticar');

            // Verify if user is actually a Super Admin
            const { data: isAdmin, error: adminError } = await supabase
                .from('saas_admins')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (adminError || !isAdmin) {
                await supabase.auth.signOut();
                throw new Error('Acesso negado. Usuário não é Super Admin.');
            }

            navigate('/saas/dashboard');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F111A] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1C1C2E] border border-white/5 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-wider mb-2">
                        BARBER<span className="text-secondary-500 font-extrabold italic ml-1">SAAS</span>
                    </h1>
                    <p className="text-gray-400">Acesso Restrito ao Super Admin</p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-secondary-500/50 focus:ring-1 focus:ring-secondary-500/50 transition-all"
                            placeholder="admin@barbersaas.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-secondary-500/50 focus:ring-1 focus:ring-secondary-500/50 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            'Entrar no Painel'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
