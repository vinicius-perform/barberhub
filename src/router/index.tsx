import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <div className="p-4 bg-green-500 text-white">ROUTER IS WORKING</div>,
    },
    {
        path: '/app',
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <div className="p-4 bg-purple-500 text-white">CHILD ROUTE WORKING</div>
            }
        ]
    }
]);
