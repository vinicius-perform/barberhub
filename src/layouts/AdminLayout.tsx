import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Scissors, DollarSign, Settings, Bell, Search, Moon, Sun, LogOut, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

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
        <div className="flex h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-200">

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                !sidebarOpen && "-translate-x-full md:hidden"
            )}>
                <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        BarberHub
                    </h1>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    <div className="mb-6">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Menu Principal
                        </p>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                )}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-4">
                        <button
                            onClick={() => navigate('/app/login')} // Mock logout
                            className="flex w-full items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Sair
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 z-10 transition-colors duration-200">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden mr-2 focus:outline-none"
                        >
                            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-64 lg:w-96">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar clientes, serviços..."
                                className="bg-transparent border-none focus:outline-none text-sm text-gray-700 dark:text-gray-200 w-full placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                            title={darkMode ? "Mudar para Claro" : "Mudar para Escuro"}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative text-gray-600 dark:text-gray-300">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-card"></span>
                        </button>

                        <div className="flex items-center ml-2 space-x-3 border-l border-gray-200 dark:border-gray-700 pl-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Dono</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
