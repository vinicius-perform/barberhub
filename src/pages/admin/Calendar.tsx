import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

const appointments = [
    {
        id: 1,
        client: 'João Silva',
        service: 'Corte Degradê',
        time: '10:00',
        duration: 2, // slots
        color: 'blue',
        staff: 'Carlos'
    },
    {
        id: 2,
        client: 'Pedro Santos',
        service: 'Barba Terapia',
        time: '14:00',
        duration: 1,
        color: 'purple',
        staff: 'Ana'
    },
    {
        id: 3,
        client: 'Marcos Oliveira',
        service: 'Corte + Barba',
        time: '16:00',
        duration: 2,
        color: 'emerald',
        staff: 'Carlos'
    }
];

export default function Calendar() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Agenda</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Gerencie os agendamentos da semana.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 p-1 rounded-xl shadow-sm">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-semibold text-slate-700 dark:text-white px-2">19 Fev, 2026</span>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2"></div>
                    <button className="bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-lg shadow-primary-500/30">
                        Hoje
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-220px)] shadow-sm">
                {/* Days Header */}
                <div className="grid grid-cols-8 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/2">
                    <div className="p-4 border-r border-slate-200 dark:border-white/5 text-center text-slate-500 dark:text-gray-500 font-medium text-xs uppercase tracking-wider">
                        Horário
                    </div>
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
                        <div key={day} className={cn(
                            "p-4 text-center border-r border-slate-200 dark:border-white/5 last:border-r-0",
                            i === 3 ? "bg-primary-50 dark:bg-primary-500/5" : "" // Highlight current day (Thursday mock)
                        )}>
                            <p className="text-slate-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">{day}</p>
                            <p className={cn(
                                "text-lg font-bold",
                                i === 3 ? "text-primary-600 dark:text-primary-500" : "text-slate-700 dark:text-white"
                            )}>{16 + i}</p>
                        </div>
                    ))}
                </div>

                {/* Time Slots */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-8 border-b border-slate-200 dark:border-white/5 min-h-[80px] group">
                            {/* Time Column */}
                            <div className="p-4 border-r border-slate-200 dark:border-white/5 text-center text-slate-500 dark:text-gray-500 text-sm font-medium bg-slate-50 dark:bg-dark-bg/30">
                                {time}
                            </div>

                            {/* Days Columns */}
                            {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                                // Mock finding appointment
                                const apt = appointments.find(a => a.time === time && (dayIdx === 2 || dayIdx === 3 || dayIdx === 5) && (Math.random() > 0.7));
                                // Randomly placing appointments for demo purposes if not exact match logic

                                // Specific Logic for Demo Visualization
                                let appointment = null;
                                if (dayIdx === 3 && time === '10:00') appointment = appointments[0];
                                if (dayIdx === 2 && time === '14:00') appointment = appointments[1];
                                if (dayIdx === 5 && time === '16:00') appointment = appointments[2];

                                return (
                                    <div key={dayIdx} className="relative border-r border-slate-200 dark:border-white/5 p-1 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        {appointment && (
                                            <div className={cn(
                                                "absolute inset-1 rounded-lg p-2 flex flex-col justify-center border-l-4 shadow-sm hover:shadow-md cursor-pointer transition-all z-10",
                                                appointment.color === 'blue' && "bg-blue-50 dark:bg-blue-500/20 border-blue-500",
                                                appointment.color === 'purple' && "bg-purple-50 dark:bg-purple-500/20 border-purple-500",
                                                appointment.color === 'emerald' && "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500",
                                            )}
                                                style={{ height: `${appointment.duration * 100}%`, minHeight: '100%' }}
                                            >
                                                <p className={cn(
                                                    "text-xs font-bold leading-tight truncate",
                                                    "text-slate-700 dark:text-white"
                                                )}>{appointment.client}</p>
                                                <p className="text-slate-500 dark:text-gray-400 text-[10px] truncate">{appointment.service}</p>
                                                <div className="flex items-center mt-1 space-x-1">
                                                    <Clock className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                                                    <span className="text-[10px] text-slate-500 dark:text-gray-400">{appointment.time}</span>
                                                </div>
                                                <div className="absolute bottom-2 right-2 flex items-center">
                                                    <div className="w-5 h-5 rounded-full bg-white dark:bg-dark-bg border border-slate-200 dark:border-white/10 flex items-center justify-center text-[8px] text-slate-500 dark:text-gray-300">
                                                        {appointment.staff[0]}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
