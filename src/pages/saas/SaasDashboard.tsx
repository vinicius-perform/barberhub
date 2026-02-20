import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Building2, Plus, Calendar, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SaasDashboard() {
    // Buscar barbearias com dados de assinatura
    const { data: barbershops, isLoading } = useQuery({
        queryKey: ['saas-barbershops'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('barbershops')
                .select(`
                    *,
                    subscriptions (
                        status,
                        plan,
                        price_monthly,
                        trial_ends_at
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },
    });

    if (isLoading) {
        return <div className="text-white">Carregando dados...</div>;
    }

    // Calcular KPIs
    const totalBarbershops = barbershops?.length || 0;
    const activeBarbershops = barbershops?.filter(b => b.subscriptions?.[0]?.status === 'active').length || 0;
    const trialBarbershops = barbershops?.filter(b => b.subscriptions?.[0]?.status === 'trial').length || 0;
    const mrr = barbershops?.reduce((acc, b) => {
        const sub = b.subscriptions?.[0];
        if (sub?.status === 'active') {
            return acc + (sub.price_monthly || 0);
        }
        return acc;
    }, 0) || 0;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Visão Geral do SaaS</h1>
                <Link
                    to="/saas/barbershops/new"
                    className="flex items-center px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nova Barbearia
                </Link>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 className="w-16 h-16 text-primary-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400">Total de Barbearias</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{totalBarbershops}</h3>
                </div>

                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-16 h-16 text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400">Ativas</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{activeBarbershops}</h3>
                </div>

                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Calendar className="w-16 h-16 text-yellow-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400">Em Trial</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{trialBarbershops}</h3>
                </div>

                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-16 h-16 text-secondary-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400">MRR Estimado</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mrr)}
                    </h3>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-white/5">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Últimas Barbearias Cadastradas</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-gray-400">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Plano</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Link Público</th>
                                <th className="px-6 py-4">Cadastro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                            {barbershops?.map((shop) => {
                                const sub = shop.subscriptions?.[0];
                                return (
                                    <tr key={shop.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {shop.name}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {sub?.plan || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${sub?.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400' : ''}
                                                ${sub?.status === 'trial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400' : ''}
                                                ${sub?.status === 'past_due' ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400' : ''}
                                                ${sub?.status === 'canceled' ? 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400' : ''}
                                            `}>
                                                {sub?.status || 'Sem status'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`/b/${shop.slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-primary-600 dark:text-primary-400 hover:underline"
                                            >
                                                /b/{shop.slug}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(shop.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
