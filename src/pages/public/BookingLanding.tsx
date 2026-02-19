import { useParams, useNavigate } from 'react-router-dom';
import { Scissors, Calendar, Star } from 'lucide-react';

export default function BookingLanding() {
    const { slug } = useParams();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text">
            {/* Hero Section */}
            <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 p-8 text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto flex items-center justify-center text-primary-600 mb-4">
                    <Scissors className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-2">BarberShop {slug || 'Demo'}</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    O melhor estilo para sua barba e cabelo. Profissionais experientes e ambiente climatizado.
                </p>
                <div className="flex items-center justify-center mt-4 text-emerald-500 font-medium">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span>4.8 (120 avaliações)</span>
                </div>
            </div>

            {/* CTA Section */}
            <div className="flex-1 p-6 flex flex-col items-center justify-start max-w-md mx-auto w-full">
                <div className="w-full bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                        Horário de Funcionamento
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex justify-between">
                            <span>Seg - Sex</span>
                            <span>09:00 - 19:00</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Sábado</span>
                            <span>09:00 - 18:00</span>
                        </li>
                        <li className="flex justify-between text-red-400">
                            <span>Domingo</span>
                            <span>Fechado</span>
                        </li>
                    </ul>
                </div>

                <button
                    onClick={() => navigate('book')}
                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all transform hover:scale-[1.02]"
                >
                    Agendar Agora
                </button>
            </div>
        </div>
    )
}
