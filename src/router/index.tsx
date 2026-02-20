import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import PublicLayout from '../layouts/PublicLayout';
import Dashboard from '../pages/admin/Dashboard';
import Calendar from '../pages/admin/Calendar';
import Services from '../pages/admin/Services';
import Staff from '../pages/admin/Staff';
import Clients from '../pages/admin/Clients';
import Finance from '../pages/admin/Finance';
import Settings from '../pages/admin/Settings';
import BookingLanding from '../pages/public/BookingLanding';
import BookingWizard from '../pages/public/BookingWizard';
import Login from '../pages/auth/Login';

// Saas Pages
import SaasLayout from '../layouts/SaasLayout';
import SaasLogin from '../pages/saas/SaasLogin';
import SaasDashboard from '../pages/saas/SaasDashboard';
import SaasBarbershopForm from '../pages/saas/SaasBarbershopForm';
import SubscriptionGuard from '../components/SubscriptionGuard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/app/login" replace />,
    },
    // SaaS Routes
    {
        path: '/saas/login',
        element: <SaasLogin />
    },
    {
        path: '/saas',
        element: <SaasLayout />,
        children: [
            { path: 'dashboard', element: <SaasDashboard /> },
            { path: 'barbershops/new', element: <SaasBarbershopForm /> }
        ]
    },
    // App Routes
    {
        path: '/app',
        element: <AdminLayout />,
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'calendar', element: <Calendar /> },
            { path: 'services', element: <Services /> },
            { path: 'staff', element: <Staff /> },
            { path: 'clients', element: <Clients /> },
            { path: 'finance', element: <Finance /> },
            { path: 'settings', element: <Settings /> },
            { path: 'login', element: <Login /> },
        ]
    },
    // Public Routes (PWA)
    {
        path: '/b/:slug',
        element: (
            <SubscriptionGuard>
                <PublicLayout />
            </SubscriptionGuard>
        ),
        children: [
            {
                index: true,
                element: <BookingLanding />,
            },
            {
                path: 'book',
                element: <BookingWizard />,
            },
            {
                path: 'booking/:token',
                element: <div className="p-8 text-center text-gray-500">Booking Details (Placeholder)</div>
            }
        ],
    },
]);
