import { Scissors, Plus, Search, MoreVertical, Clock, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

const services = [
    { id: 1, name: 'Corte Degradê', duration: '45 min', price: 'R$ 50,00', category: 'Cabelo', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Barba Completa', duration: '30 min', price: 'R$ 35,00', category: 'Barba', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=200&auto=format&fit=crop' },
    { id: 3, name: 'Corte + Barba', duration: '1h 15m', price: 'R$ 80,00', category: 'Combo', image: 'https://images.unsplash.com/photo-1599351431202-6e0005db28b2?q=80&w=200&auto=format&fit=crop' },
    { id: 4, name: 'Sobrancelha', duration: '15 min', price: 'R$ 15,00', category: 'Facial', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop' },
    { id: 5, name: 'Pezinho', duration: '15 min', price: 'R$ 10,00', category: 'Acabamento', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=200&auto=format&fit=crop' },
];

export default function Services() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Serviços</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Gerencie seu catálogo de serviços.</p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary-500/30 flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Serviço
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-2 rounded-2xl w-full md:w-auto self-start shadow-sm">
                <div className="flex items-center px-4 py-2 bg-slate-50 dark:bg-dark-bg rounded-xl border border-slate-200 dark:border-white/5 flex-1 md:w-80">
                    <Search className="w-4 h-4 text-slate-500 dark:text-gray-500 mr-3" />
                    <input type="text" placeholder="Buscar serviço..." className="bg-transparent border-none focus:outline-none text-sm text-slate-700 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 w-full" />
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 rounded-xl text-sm font-medium bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-500 border border-primary-200 dark:border-primary-500/20">Todos</button>
                    <button className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Cabelo</button>
                    <button className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Barba</button>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="group bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all hover:shadow-lg hover:shadow-primary-500/5 relative">
                        {/* Image Header */}
                        <div className="h-32 bg-slate-200 dark:bg-gray-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-card to-transparent z-10" />
                            <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <span className="absolute top-3 right-3 z-20 px-2 py-1 rounded-lg bg-white/90 dark:bg-black/40 backdrop-blur-md text-[10px] font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 uppercase tracking-wider">
                                {service.category}
                            </span>
                        </div>

                        <div className="p-5 relative z-20 -mt-8">
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-xl">
                                <Scissors className="w-6 h-6 text-primary-600 dark:text-primary-500" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.name}</h3>

                            <div className="flex items-center space-x-4 mt-4 text-sm text-slate-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1.5 text-slate-400 dark:text-gray-500" />
                                    {service.duration}
                                </div>
                                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                                    <DollarSign className="w-4 h-4 mr-0.5" />
                                    {service.price}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                <button className="flex-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-white/5 transition-colors">
                                    Editar
                                </button>
                                <button className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-500/20 text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg border border-slate-200 dark:border-white/5 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card (Empty State) */}
                <button className="border-2 border-dashed border-slate-300 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary-500/30 hover:bg-primary-50 dark:hover:bg-primary-500/5 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 flex items-center justify-center mb-4 transition-colors">
                        <Plus className="w-8 h-8 text-slate-400 dark:text-gray-600 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                    </div>
                    <p className="text-slate-500 dark:text-gray-400 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400">Adicionar Serviço</p>
                </button>
            </div>
        </div>
    );
}
