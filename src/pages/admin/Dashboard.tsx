import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts';
import { Users, Scissors, CalendarCheck, FileText } from 'lucide-react';
import { KpiCard } from '../../components/KpiCard';

const data = [
    { name: 'Jan', bookings: 4 },
    { name: 'Feb', bookings: 7 },
    { name: 'Mar', bookings: 12 },
    { name: 'Apr', bookings: 18 },
    { name: 'May', bookings: 24 },
    { name: 'Jun', bookings: 45 },
    { name: 'Jul', bookings: 53 },
    { name: 'Aug', bookings: 78 },
    { name: 'Sep', bookings: 89 },
    { name: 'Oct', bookings: 104 },
    { name: 'Nov', bookings: 115 },
    { name: 'Dec', bookings: 130 },
];

const pieData = [
    { name: 'Completed', value: 65, color: '#3b82f6' }, // Blue
    { name: 'Upcoming', value: 30, color: '#fbbf24' }, // Amber
    { name: 'Canceled', value: 5, color: '#ef4444' },  // Red
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                    + Add New Booking
                </button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Clients" value="33" change="+67%" icon={Users} color="blue" />
                <KpiCard title="Total Services" value="09" change="+42%" icon={Scissors} color="purple" />
                <KpiCard title="Employees" value="07" change="+26%" icon={Users} color="emerald" />
                <KpiCard title="Appointments" value="82" change="+19%" icon={CalendarCheck} color="amber" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Area Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-light-border dark:border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-white">Booking Analytics</h3>
                        <select className="bg-slate-50 dark:bg-dark-bg border border-light-border dark:border-white/10 text-xs rounded-lg px-3 py-1.5 text-slate-600 dark:text-gray-400 outline-none">
                            <option>Yearly</option>
                            <option>Monthly</option>
                        </select>
                    </div>

                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeClassName="stroke-slate-200 dark:stroke-[#2A2A45]" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--tooltip-bg, #1C1C2E)', color: '#fff', border: '1px solid #2A2A45', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                                />
                                <Area type="monotone" dataKey="bookings" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBookings)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white dark:bg-dark-card border border-light-border dark:border-white/5 p-6 rounded-2xl flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-slate-800 dark:text-white">Status</h3>
                        <button className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <FileText className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={6}
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-slate-400 dark:text-gray-400 text-xs text-center">Total<br />Bookings</span>
                            <span className="text-2xl font-bold text-slate-800 dark:text-white mt-1">100%</span>
                        </div>
                    </div>

                    <div className="space-y-3 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm group cursor-default">
                                <div className="flex items-center">
                                    <div className="w-2 h-8 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors">{item.name}</span>
                                </div>
                                <span className="font-bold text-slate-700 dark:text-white">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white dark:bg-dark-card border border-light-border dark:border-white/5 rounded-2xl overflow-hidden p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-white">Recent Appointments</h3>
                    <button className="text-sm text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 font-medium hover:underline">View All History</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 dark:text-gray-500 uppercase border-b border-light-border dark:border-white/5">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Client Name</th>
                                <th className="px-4 py-3 font-semibold">Service</th>
                                <th className="px-4 py-3 font-semibold">Time</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3 text-right font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-light-border dark:divide-white/5">
                            {[1, 2, 3, 4].map((i) => (
                                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center">
                                            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 mr-3 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-gray-400">
                                                JD
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-white transition-colors">John Doe</p>
                                                <p className="text-xs text-slate-500 dark:text-gray-500">#C-82{i}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-slate-500 dark:text-gray-400">Haircut & Beard</td>
                                    <td className="px-4 py-4 text-slate-500 dark:text-gray-400">14:00 - 15:00</td>
                                    <td className="px-4 py-4">
                                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20">
                                            Confirmed
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button className="text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-white p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
