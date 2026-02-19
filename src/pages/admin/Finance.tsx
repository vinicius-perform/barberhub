import { DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const data = [
    { name: 'Seg', revenue: 1540 },
    { name: 'Ter', revenue: 1200 },
    { name: 'Qua', revenue: 1890 },
    { name: 'Qui', revenue: 2390 },
    { name: 'Sex', revenue: 3490 },
    { name: 'Sáb', revenue: 4200 },
    { name: 'Dom', revenue: 900 },
];

const transactions = [
    { id: 1, desc: 'Corte Degradê - João S.', date: 'Hoje, 14:30', amount: '+ R$ 50,00', type: 'income' },
    { id: 2, desc: 'Conta de Luze', date: 'Hoje, 09:00', amount: '- R$ 450,00', type: 'expense' },
    { id: 3, desc: 'Barba - Pedro', date: 'Ontem, 19:00', amount: '+ R$ 35,00', type: 'income' },
    { id: 4, desc: 'Produtos Barber', date: 'Ontem, 10:00', amount: '- R$ 120,00', type: 'expense' },
];

export default function Finance() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Financeiro</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Visão geral do fluxo de caixa e relatórios.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="bg-white dark:bg-dark-card text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Relatório
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/30">
                        Registrar Despesa
                    </button>
                </div>
            </div>

            {/* Total Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary-600 to-primary-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl shadow-primary-900/20">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Wallet className="w-32 h-32" />
                    </div>
                    <p className="text-primary-100 font-medium mb-1">Saldo Total</p>
                    <h2 className="text-4xl font-bold mb-8">R$ 12.450,00</h2>
                    <div className="flex items-center text-sm bg-white/10 w-fit px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        +15% esse mês
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full transition-transform group-hover:scale-110" />
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 mr-4">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Receitas (Fev)</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">R$ 15.230,00</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full transition-transform group-hover:scale-110" />
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-xl text-red-600 dark:text-red-400 mr-4">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">Despesas (Fev)</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">R$ 2.780,00</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts & Table Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Receita Semanal</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#2A2A45" : "#e2e8f0"} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: isDark ? '#64748b' : '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: isDark ? '#64748b' : '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1C1C2E' : '#ffffff',
                                        color: isDark ? '#fff' : '#0f172a',
                                        border: isDark ? '1px solid #2A2A45' : '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 ? '#3b82f6' : (isDark ? '#252540' : '#cbd5e1')} /> // Highlight Saturday
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Últimas Movimentações</h3>
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-lg mr-3 ${tx.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500'}`}>
                                        {tx.type === 'income' ? <DollarSign className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{tx.desc}</p>
                                        <p className="text-xs text-slate-500 dark:text-gray-500">{tx.date}</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {tx.amount}
                                </span>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-2 border border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-gray-500 text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Ver Extrato Completo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
