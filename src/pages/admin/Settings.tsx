import { useState, useEffect } from 'react';
import { Store, User, Lock, Bell, Globe, Save, Copy, ExternalLink, QrCode } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import QRCode from 'react-qr-code';

export default function Settings() {
    const [barbershop, setBarbershop] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('barbearia');

    useEffect(() => {
        const fetchBarbershop = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('barbershops')
                    .select('*')
                    .eq('owner_id', user.id)
                    .single();

                if (!error && data) {
                    setBarbershop(data);
                }
            }
            setLoading(false);
        };

        fetchBarbershop();
    }, []);

    const publicUrl = barbershop ? `${window.location.origin}/b/${barbershop.slug}` : '';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl);
        alert('Link copiado!');
    };

    if (loading) return <div className="text-white">Carregando...</div>;

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Personalize sua experiência no BarberHub.</p>
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
                        { id: 'barbearia', icon: Store, label: 'Barbearia' },
                        { id: 'link', icon: Globe, label: 'Link & Divulgação' },
                        { id: 'perfil', icon: User, label: 'Perfil' },
                        { id: 'seguranca', icon: Lock, label: 'Segurança' },
                        { id: 'notificacoes', icon: Bell, label: 'Notificações' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                ? 'bg-primary-600/10 text-primary-600 dark:text-primary-400 border border-primary-500/20'
                                : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                                }`}
                        >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* Link & Divulgação Tab */}
                    {activeTab === 'link' && (
                        <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-8 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Link de Agendamento</h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">Compartilhe este link com seus clientes para que eles possam agendar horários.</p>

                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-600 dark:text-gray-300 font-mono text-sm truncate">
                                        {publicUrl}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-slate-600 dark:text-gray-300 transition-colors"
                                        title="Copiar Link"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                    <a
                                        href={publicUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-slate-600 dark:text-gray-300 transition-colors"
                                        title="Abrir Página"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 dark:border-white/10 pt-8">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center">
                                    <QrCode className="w-5 h-5 mr-2 text-primary-500" />
                                    QR Code para Impressão
                                </h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">Imprima este código e coloque na recepção da sua barbearia.</p>

                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                                        <QRCode value={publicUrl} size={180} />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-sm text-slate-600 dark:text-gray-300">
                                            <p className="font-semibold mb-1">Dicas de uso:</p>
                                            <ul className="list-disc pl-4 space-y-1">
                                                <li>Coloque no balcão da recepção</li>
                                                <li>Adicione nos cartões de visita</li>
                                                <li>Cole no espelho de cada bancada</li>
                                                <li>Compartilhe no Instagram Stories</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Barbearia Info Tab */}
                    {activeTab === 'barbearia' && (
                        <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Informações da Barbearia</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Nome do Estabelecimento</label>
                                    <input type="text" defaultValue={barbershop?.name} className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Slug (URL)</label>
                                    <div className="flex">
                                        <span className="bg-white/5 border border-r-0 border-white/10 rounded-l-xl px-4 py-3 text-slate-500 dark:text-gray-400 text-sm">.../b/</span>
                                        <input type="text" defaultValue={barbershop?.slug} disabled className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-r-xl px-4 py-3 text-slate-800 dark:text-white opacity-50 cursor-not-allowed" />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase">Descrição/Bio</label>
                                    <textarea rows={3} defaultValue="A melhor barbearia da cidade. Cortes modernos e ambiente climatizado." className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50 resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other tabs can be implemented later */}
                    {!['barbearia', 'link'].includes(activeTab) && (
                        <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl p-16 text-center">
                            <p className="text-slate-500 dark:text-gray-400">Funcionalidade em desenvolvimento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
