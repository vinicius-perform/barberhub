import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface KpiCardProps {
    title: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: 'blue' | 'purple' | 'emerald' | 'amber';
}

const colorMap = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
}

const progressMap = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
}

export function KpiCard({ title, value, change, icon: Icon, color }: KpiCardProps) {
    return (
        <div className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg", colorMap[color])}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    {change}
                </span>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
            </div>
            <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full w-2/3", progressMap[color])}></div>
            </div>
        </div>
    )
}
