import { Store, User, Lock, Bell, Moon, Globe, Save } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Configurações</h1>
                    <p className="text-gray-400 text-sm mt-1">Personalize sua experiência no BarberHub.</p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-glow-blue flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Settings Sidebar */}
                <div className="md:col-span-1 space-y-2">
                    {[
                        { icon: Store, label: 'Barbearia', active: true },
                        { icon: User, label: 'Perfil', active: false },
                        { icon: Lock, label: 'Segurança', active: false },
                        { icon: Bell, label: 'Notificações', active: false },
                        { icon: Globe, label: 'Integrações', active: false },
                    ].map((item) => (
                        <button key={item.label} className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20' : 'text-slate-500 dark:text-gray-400 hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                            }`}>
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* Barbearia Info */}
                    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-8">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Informações da Barbearia</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Nome do Estabelecimento</label>
                                <input type="text" defaultValue="Barber King Premium" className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Slug (URL)</label>
                                <div className="flex">
                                    <span className="bg-white/5 border border-r-0 border-white/10 rounded-l-xl px-4 py-3 text-slate-500 dark:text-gray-400 text-sm">barberhub.com/b/</span>
                                    <input type="text" defaultValue="barber-king" className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-r-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50" />
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Descrição/Bio</label>
                                <textarea rows={3} defaultValue="A melhor barbearia da cidade. Cortes modernos e ambiente climatizado." className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50 resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* Address & Contact */}
                    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-8">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Localização e Contato</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Endereço</label>
                                <input type="text" defaultValue="Av. Paulista, 1000 - Bela Vista" className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Telefone / WhatsApp</label>
                                <input type="text" defaultValue="(11) 99999-9999" className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50" />
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-8">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Preferências</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-bg/50 rounded-xl border border-slate-200 dark:border-white/5">
                                <div>
                                    <p className="font-medium text-slate-800 dark:text-white">Aceitar agendamentos automáticos</p>
                                    <p className="text-xs text-slate-500 dark:text-gray-400">Se desativado, você precisará aprovar manualmente.</p>
                                </div>
                                <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark-bg/50 rounded-xl border border-slate-200 dark:border-white/5">
                                <div>
                                    <p className="font-medium text-slate-800 dark:text-white">Notificações por Email</p>
                                    <p className="text-xs text-slate-500 dark:text-gray-400">Receba um resumo diário dos agendamentos.</p>
                                </div>
                                <div className="w-12 h-6 bg-slate-200 dark:bg-white/10 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-400 rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
