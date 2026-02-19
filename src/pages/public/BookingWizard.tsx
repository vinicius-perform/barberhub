import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, Scissors, User, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format, addDays, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock Data
const services = [
    { id: '1', name: 'Corte de Cabelo', duration: 30, price: 50, description: 'Corte moderno com acabamento na navalha.' },
    { id: '2', name: 'Barba Completa', duration: 20, price: 35, description: 'Modelagem de barba e toalha quente.' },
    { id: '3', name: 'Combo (Corte + Barba)', duration: 50, price: 80, description: 'Pacote completo para cuidar do visual.' },
    { id: '4', name: 'Sobrancelha', duration: 15, price: 15, description: 'Design e limpeza.' },
];

const staff = [
    { id: '1', name: 'João Silva', role: 'Barbeiro Master' },
    { id: '2', name: 'Pedro Santos', role: 'Barbeiro' },
    { id: '3', name: 'Lucas Oliveira', role: 'Barbeiro' },
];

const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export default function BookingWizard() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState({
        serviceId: '',
        staffId: '',
        date: new Date(),
        time: '',
        name: '',
        phone: ''
    });

    const selectedService = services.find(s => s.id === booking.serviceId);
    const selectedStaff = staff.find(s => s.id === booking.staffId);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleServiceSelect = (id: string) => {
        setBooking({ ...booking, serviceId: id });
    };

    const handleStaffSelect = (id: string) => {
        setBooking({ ...booking, staffId: id });
    };

    const handleTimeSelect = (time: string) => {
        setBooking({ ...booking, time });
    };

    const today = startOfToday();
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

    const renderStep1_Services = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Escolha o Serviço</h2>
            <div className="grid grid-cols-1 gap-3">
                {services.map(service => (
                    <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={cn(
                            "p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800",
                            booking.serviceId === service.id
                                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card"
                        )}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{service.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{service.duration} min</p>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">R$ {service.price.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep2_Staff = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Escolha o Profissional</h2>
            <div className="grid grid-cols-1 gap-3">
                <div
                    onClick={() => handleStaffSelect('any')}
                    className={cn(
                        "p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800",
                        booking.staffId === 'any'
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card"
                    )}
                >
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold mr-3">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Primeiro Disponível</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Qualquer profissional livre</p>
                        </div>
                    </div>
                </div>

                {staff.map(member => (
                    <div
                        key={member.id}
                        onClick={() => handleStaffSelect(member.id)}
                        className={cn(
                            "p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800",
                            booking.staffId === member.id
                                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card"
                        )}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep3_DateTime = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Data e Hora</h2>

            {/* Days Slider */}
            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                {weekDays.map(day => {
                    const isSelected = format(booking.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => setBooking({ ...booking, date: day })}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[4rem] p-3 rounded-xl border transition-colors",
                                isSelected
                                    ? "bg-primary-600 text-white border-primary-600"
                                    : "bg-white dark:bg-dark-card border-gray-200 dark:border-gray-700 hover:border-primary-300"
                            )}
                        >
                            <span className="text-xs font-semibold uppercase">{format(day, 'EEE', { locale: ptBR })}</span>
                            <span className="text-lg font-bold">{format(day, 'd')}</span>
                        </button>
                    )
                })}
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
                {timeSlots.map(time => (
                    <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                            "py-2 px-1 text-sm font-medium rounded-lg border transition-all",
                            booking.time === time
                                ? "bg-primary-600 text-white border-primary-600"
                                : "bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300"
                        )}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep4_Confirm = () => (
        <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Seus Dados e Confirmação</h2>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-3">
                <div className="flex items-center text-sm">
                    <Scissors className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="dark:text-gray-300">{selectedService?.name} - R$ {selectedService?.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="dark:text-gray-300">{selectedStaff?.name || 'Qualquer profissional'}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                    <span className="dark:text-gray-300">{format(booking.date, "d 'de' MMMM", { locale: ptBR })} às {booking.time}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seu Nome</label>
                    <input
                        type="text"
                        value={booking.name}
                        onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-dark-card dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="Ex: Vinicius"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seu WhatsApp</label>
                    <input
                        type="tel"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-dark-card dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                        placeholder="(11) 99999-9999"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text p-4 pb-24">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={() => step > 1 ? prevStep() : navigate(`/b/${slug}`)} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="ml-2">
                    <h1 className="font-bold text-lg">Agendar Horário</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Passo {step} de 4</p>
                </div>
            </div>

            {/* Content */}
            <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                {step === 1 && renderStep1_Services()}
                {step === 2 && renderStep2_Staff()}
                {step === 3 && renderStep3_DateTime()}
                {step === 4 && renderStep4_Confirm()}
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => {
                            if (step === 1 && !booking.serviceId) return;
                            if (step === 2 && !booking.staffId) return;
                            if (step === 3 && !booking.time) return;
                            if (step === 4) {
                                // TODO: Submit booking
                                alert('Agendamento realizado com sucesso! (Mock)');
                                navigate(`/b/${slug}/booking/mock-token`);
                            } else {
                                nextStep();
                            }
                        }}
                        disabled={
                            (step === 1 && !booking.serviceId) ||
                            (step === 2 && !booking.staffId) ||
                            (step === 3 && !booking.time) ||
                            (step === 4 && (!booking.name || !booking.phone))
                        }
                        className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-all flex items-center justify-center"
                    >
                        {step === 4 ? (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" /> Confirmar Agendamento
                            </>
                        ) : (
                            <>
                                Continuar <ChevronRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
