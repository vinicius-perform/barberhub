import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "viniciusmarinhods@gmail.com" && password === "admin") {
            // In a real app, you'd set an auth token here
            localStorage.setItem("barberhub-auth", "true");
            navigate("/app/dashboard");
        } else {
            alert("Credenciais inválidas! Tente novamente.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-dark-card p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-white/5">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bem-vindo de volta</h1>
                    <p className="text-gray-500 dark:text-gray-400">Entre com suas credenciais para acessar o painel.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="viniciusmarinhods@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Senha</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Esqueceu sua senha? <a href="#" className="text-primary-500 hover:text-primary-400 font-medium">Recuperar acesso</a>
                </div>
            </div>
        </div>
    )
}
