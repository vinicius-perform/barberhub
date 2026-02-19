export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg">
            <div className="w-full max-w-md bg-white dark:bg-dark-card p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login BarberHub</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" placeholder="admin@barber.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" placeholder="********" />
                    </div>
                    <button className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">Entrar</button>
                </form>
            </div>
        </div>
    )
}
