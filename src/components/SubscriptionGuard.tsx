import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, AlertOctagon } from 'lucide-react';

export default function SubscriptionGuard({ children }: { children: React.ReactNode }) {
    const { slug } = useParams();
    const [status, setStatus] = useState<'loading' | 'allowed' | 'blocked' | 'not_found'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!slug) {
            setStatus('not_found');
            return;
        }

        const checkStatus = async () => {
            try {
                // Fetch barbershop and subscription
                const { data: barbershop, error } = await supabase
                    .from('barbershops')
                    .select(`
                        id,
                        is_active,
                        subscriptions (
                            status
                        )
                    `)
                    .eq('slug', slug)
                    .single();

                if (error || !barbershop) {
                    setStatus('not_found');
                    return;
                }

                if (!barbershop.is_active) {
                    setStatus('blocked');
                    setMessage('Esta barbearia está temporariamente indisponível.');
                    return;
                }

                const sub = barbershop.subscriptions?.[0];
                const validStatuses = ['active', 'trial'];

                if (!sub || !validStatuses.includes(sub.status)) {
                    setStatus('blocked');
                    setMessage('Os serviços desta barbearia estão suspensos. Entre em contato com o estabelecimento.');
                    return;
                }

                setStatus('allowed');
            } catch (err) {
                console.error(err);
                setStatus('blocked');
                setMessage('Erro ao verificar disponibilidade.');
            }
        };

        checkStatus();
    }, [slug]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-pulse text-slate-500">Verificando disponibilidade...</div>
            </div>
        );
    }

    if (status === 'not_found') {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                <AlertOctagon className="w-16 h-16 text-slate-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Barbearia não encontrada</h1>
                <p className="text-slate-400">Verifique o link e tente novamente.</p>
            </div>
        );
    }

    if (status === 'blocked') {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                <Lock className="w-16 h-16 text-slate-600 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Acesso Indisponível</h1>
                <p className="text-slate-400 max-w-md">{message}</p>
            </div>
        );
    }

    return <>{children}</>;
}
