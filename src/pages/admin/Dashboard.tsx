import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts';
import { Users, Scissors, CalendarCheck } from 'lucide-react';
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
    { name: 'Completed', value: 60, color: '#3b82f6' },
    { name: 'Upcoming', value: 30, color: '#fbbf24' },
    { name: 'Canceled', value: 10, color: '#ef4444' },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Gerar Relatório
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="Total Clients" value="33" change="+67%" icon={Users} color="blue" />
                <KpiCard title="Total Services" value="09" change="+42%" icon={Scissors} color="purple" />
                <KpiCard title="Employees" value="07" change="+26%" icon={Users} color="emerald" />
                <KpiCard title="Appointments" value="82" change="+19%" icon={CalendarCheck} color="amber" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">All Bookings</h3>
                        <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm rounded-md px-3 py-1 text-gray-600 dark:text-gray-300">
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="bookings" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBookings)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Bookings Status</h3>
                        <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm rounded-md px-3 py-1 text-gray-600 dark:text-gray-300">
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div className="h-48 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-gray-400 text-xs">Total</span>
                            <span className="text-xl font-bold dark:text-white">100%</span>
                        </div>
                    </div>
                    <div className="space-y-3 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                                </div>
                                <span className="font-semibold dark:text-gray-200">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Upcoming Bookings</h3>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Name</th>
                                <th className="px-4 py-3">Services</th>
                                <th className="px-4 py-3">Start Time</th>
                                <th className="px-4 py-3">End Time</th>
                                <th className="px-4 py-3">Client</th>
                                <th className="px-4 py-3 rounded-r-lg text-right">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                                            Mostofa kamal
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Hair Cut</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">10:30:00</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">11:00:00</td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">26</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="text-gray-400 hover:text-gray-600">...</button>
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
