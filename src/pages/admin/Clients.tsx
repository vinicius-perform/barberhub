import { Search, Mail, Phone, MoreHorizontal, Filter } from 'lucide-react';

const clients = [
    { id: 1, name: 'Lucas Pereira', email: 'lucas.p@gmail.com', phone: '(11) 91234-5678', lastVisit: '10/02/2026', totalVisits: 12, status: 'Active' },
    { id: 2, name: 'Mateus Silva', email: 'mateus.s@hotmail.com', phone: '(11) 98765-4321', lastVisit: '05/02/2026', totalVisits: 3, status: 'New' },
    { id: 3, name: 'Rafael Costa', email: 'rafa.costa@uol.com.br', phone: '(11) 95555-4444', lastVisit: '15/01/2026', totalVisits: 28, status: 'VIP' },
    { id: 4, name: 'Bruno Santos', email: 'bruno.s@gmail.com', phone: '(11) 93333-2222', lastVisit: '20/12/2025', totalVisits: 1, status: 'Inactive' },
    { id: 5, name: 'Gabriel Almeida', email: 'gabriel.a@gmail.com', phone: '(11) 91111-0000', lastVisit: '18/02/2026', totalVisits: 8, status: 'Active' },
];

export default function Clients() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Clientes</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Base de dados de clientes ({clients.length}).</p>
                </div>
                <div className="flex space-x-3">
                    <button className="bg-white dark:bg-dark-card text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center shadow-sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Marketing
                    </button>
                    <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary-500/30">
                        + Novo Cliente
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden p-6 shadow-sm">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-gray-500" />
                        <input type="text" placeholder="Buscar por nome, email ou telefone..." className="w-full bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-primary-500/50 transition-colors placeholder-slate-400 dark:placeholder-gray-600" />
                    </div>
                    <button className="flex items-center justify-center px-4 py-2.5 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 dark:text-gray-500 uppercase bg-slate-50 dark:bg-dark-bg/50 border-y border-slate-200 dark:border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-semibold rounded-l-lg">Cliente</th>
                                <th className="px-6 py-4 font-semibold">Contato</th>
                                <th className="px-6 py-4 font-semibold">Última Visita</th>
                                <th className="px-6 py-4 font-semibold">Visitas</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 text-right font-semibold rounded-r-lg">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {clients.map((client) => (
                                <tr key={client.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/50 dark:to-primary-800/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold mr-3 border border-primary-200 dark:border-primary-500/10">
                                                {client.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-800 dark:text-white">{client.name}</div>
                                                <div className="text-xs text-slate-500 dark:text-gray-500">ID: #{1000 + client.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center text-slate-500 dark:text-gray-400">
                                                <Mail className="w-3 h-3 mr-2" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center text-slate-500 dark:text-gray-400">
                                                <Phone className="w-3 h-3 mr-2" />
                                                {client.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-gray-300">{client.lastVisit}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">{client.totalVisits}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${client.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/20' :
                                            client.status === 'New' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-200 dark:border-blue-500/20' :
                                                client.status === 'VIP' ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-500 border-purple-200 dark:border-purple-500/20' :
                                                    'bg-slate-100 dark:bg-gray-500/10 text-slate-500 dark:text-gray-500 border-slate-200 dark:border-gray-500/20'
                                            }`}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Mock */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-white/5">
                    <p className="text-xs text-slate-500 dark:text-gray-500">Mostrando 1-5 de 243 clientes</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50">Anterior</button>
                        <button className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5">Próximo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
