import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: 'blue' | 'purple' | 'emerald' | 'amber';
}

export function KpiCard({ title, value, change, icon: Icon, color }: KpiCardProps) {
    // Map colors to our new dynamic palette
    const colorStyles = {
        blue: {
            bg: 'from-blue-500/10 to-transparent',
            iconBg: 'bg-blue-500/20',
            iconColor: 'text-blue-400',
            bar: 'bg-blue-500'
        },
        purple: {
            bg: 'from-purple-500/10 to-transparent',
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-400',
            bar: 'bg-purple-500'
        },
        emerald: {
            bg: 'from-emerald-500/10 to-transparent',
            iconBg: 'bg-emerald-500/20',
            iconColor: 'text-emerald-400',
            bar: 'bg-emerald-500'
        },
        amber: {
            bg: 'from-amber-500/10 to-transparent',
            iconBg: 'bg-amber-500/20',
            iconColor: 'text-amber-400',
            bar: 'bg-amber-500'
        }
    };

    // Default to blue if invalid
    const style = colorStyles[color] || colorStyles.blue;
    const isPositive = change.startsWith('+');

    return (
        <div className={cn(
            "relative p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-white/5 overflow-hidden group hover:border-primary-500/20 dark:hover:border-white/10 transition-all shadow-sm hover:shadow-md"
        )}>
            {/* Ambient Glow (Dark Mode Only) */}
            <div className={cn("hidden dark:block absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-50 rounded-bl-full pointer-events-none", style.bg)} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-slate-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
                    <div className={cn("p-2 rounded-xl transition-colors",
                        // Light mode: solid gentle color. Dark mode: transparent glow.
                        `${style.iconColor} bg-opacity-10 dark:bg-opacity-20`,
                        style.iconBg
                    )}>
                        <Icon className={cn("w-5 h-5", style.iconColor)} />
                    </div>
                </div>

                <div className="flex items-end justify-between">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{value}</h3>
                        <div className="hidden h-1.5 w-24 bg-slate-100 dark:bg-dark-bg rounded-full overflow-hidden mt-2">
                            <div className={cn("h-full rounded-full w-[70%]", style.bar)}></div>
                        </div>
                    </div>

                    <div className={cn(
                        "flex items-center text-xs font-bold px-2 py-1 rounded-lg",
                        isPositive
                            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10"
                            : "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-400/10"
                    )}>
                        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {change}
                    </div>
                </div>

                {/* Progress Mini Bar */}
                <div className="mt-4 w-full h-1 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full w-[60%] group-hover:w-[75%] transition-all duration-500", style.bar)}></div>
                </div>
            </div>
        </div>
    );
}
