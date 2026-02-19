import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Scissors, DollarSign, Settings, Bell, Search, LogOut, Menu, User, Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();

    const navItems = [
        { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/app/calendar', icon: Calendar, label: 'Agenda' },
        { to: '/app/services', icon: Scissors, label: 'Serviços' },
        { to: '/app/staff', icon: Users, label: 'Profissionais' },
        { to: '/app/clients', icon: Users, label: 'Clientes' },
        { to: '/app/finance', icon: DollarSign, label: 'Financeiro' },
        { to: '/app/settings', icon: Settings, label: 'Configurações' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-dark-text overflow-hidden transition-colors duration-300">

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-[#0F111A] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col pl-4 py-4 gap-4 border-r border-[#2A2A45] md:border-none",
                !sidebarOpen && "-translate-x-full md:hidden"
            )}>
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6">
                    <h1 className="text-2xl font-bold text-white tracking-wider flex items-center">
                        BARBER<span className="text-primary-500 font-extrabold italic ml-1">HUB</span>
                    </h1>
                </div>

                {/* Navigation Container - Glass Effect */}
                <div className="flex-1 bg-[#1C1C2E]/50 backdrop-blur-sm rounded-r-3xl border-y border-r border-white/5 flex flex-col py-6 pr-4">
                    <nav className="space-y-1.5 px-4 overflow-y-auto custom-scrollbar">
                        <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                            Menu
                        </p>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-primary-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Active Indicator Bar */}
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full shadow-[0_0_10px_#3b82f6]"></span>
                                        )}

                                        <item.icon className={cn(
                                            "w-5 h-5 mr-3 transition-colors",
                                            isActive ? "text-primary-500" : "text-gray-500 group-hover:text-gray-300"
                                        )} />

                                        <span className="z-10">{item.label}</span>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto px-4 pt-6 md:pt-4">
                        <button
                            onClick={() => navigate('/app/login')}
                            className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sair do Sistema
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

                {/* Header */}
                <header className="h-20 flex items-center justify-between px-6 lg:px-10 z-10">
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 md:hidden mr-4"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Search Bar - Modern & Dark */}
                        <div className="hidden md:flex items-center bg-white dark:bg-dark-card border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-2.5 w-80 shadow-sm focus-within:ring-1 focus-within:ring-primary-500/50 transition-all">
                            <Search className="w-4 h-4 text-slate-400 dark:text-gray-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="bg-transparent border-none focus:outline-none text-sm text-slate-800 dark:text-gray-200 w-full placeholder-slate-400 dark:placeholder-gray-600"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary-500 rounded-full shadow-[0_0_8px_#8b5cf6]"></span>
                        </button>

                        <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-white/5">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Mostofa Kamal</p>
                                <p className="text-xs text-slate-500 dark:text-gray-500">Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-primary-500/30 p-0.5">
                                <div className="w-full h-full rounded-full bg-slate-200 dark:bg-dark-card flex items-center justify-center overflow-hidden relative">
                                    <User className="w-6 h-6 text-slate-400 dark:text-gray-400" />
                                    {/* Mock Image Placeholder */}
                                    <img
                                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                                        alt="User"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Scrollable */}
                <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-6 custom-scrollbar">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
