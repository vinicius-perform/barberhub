import { MoreHorizontal, Plus, Star, Phone, Mail, Calendar } from 'lucide-react';

const staffMembers = [
    {
        id: 1,
        name: 'Carlos Oliveira',
        role: 'Master Barber',
        rating: 4.9,
        reviews: 124,
        phone: '(11) 99999-1234',
        email: 'carlos@barberhub.com',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
        status: 'online'
    },
    {
        id: 2,
        name: 'Ana Souza',
        role: 'Especialista em Barba',
        rating: 4.8,
        reviews: 98,
        phone: '(11) 98888-5678',
        email: 'ana@barberhub.com',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
        status: 'busy'
    },
    {
        id: 3,
        name: 'Roberto Costa',
        role: 'Cabeleireiro Sênior',
        rating: 4.7,
        reviews: 86,
        phone: '(11) 97777-4321',
        email: 'roberto@barberhub.com',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
        status: 'offline'
    }
];

export default function Staff() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Equipe</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Gerencie seus profissionais e permissões.</p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary-500/30 flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar Membro
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffMembers.map((member) => (
                    <div key={member.id} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-primary-500/30 transition-all hover:shadow-lg hover:shadow-primary-500/5">
                        {/* Status Indicator */}
                        <div className={`absolute top-6 right-6 w-3 h-3 rounded-full border-2 border-white dark:border-dark-card ${member.status === 'online' ? 'bg-emerald-500' :
                            member.status === 'busy' ? 'bg-amber-500' : 'bg-gray-500'
                            }`} />

                        <div className="flex items-center space-x-4 mb-6">
                            <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-white/10 group-hover:border-primary-500/50 transition-colors" />
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">{member.name}</h3>
                                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">{member.role}</p>
                                <div className="flex items-center mt-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span className="text-xs text-slate-600 dark:text-gray-300 font-bold">{member.rating}</span>
                                    <span className="text-xs text-slate-400 dark:text-gray-500 ml-1">({member.reviews} avaliações)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-slate-500 dark:text-gray-400 p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                                <Phone className="w-4 h-4 mr-3 text-slate-400 dark:text-gray-500" />
                                {member.phone}
                            </div>
                            <div className="flex items-center text-sm text-slate-500 dark:text-gray-400 p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                                <Mail className="w-4 h-4 mr-3 text-slate-400 dark:text-gray-500" />
                                {member.email}
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button className="flex-1 bg-primary-50 dark:bg-primary-600/10 hover:bg-primary-100 dark:hover:bg-primary-600/20 text-primary-600 dark:text-primary-400 font-semibold py-2 rounded-lg text-sm transition-colors border border-primary-200 dark:border-primary-500/20">
                                Ver Agenda
                            </button>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
