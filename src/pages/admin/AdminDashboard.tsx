import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface Stats {
    administrations: number;
    news: number;
    documents: number;
}

export const AdminDashboard = () => {
    const [stats, setStats] = useState<Stats>({
        administrations: 0,
        news: 0,
        documents: 0,
    });

    useEffect(() => {
        const load = async () => {
            const [a, n, d] = await Promise.all([
                supabase.from('administrations').select('*', { count: 'exact', head: true }),
                supabase.from('news').select('*', { count: 'exact', head: true }),
                supabase.from('documents').select('*', { count: 'exact', head: true }),
            ]);
            setStats({
                administrations: a.count ?? 0,
                news: n.count ?? 0,
                documents: d.count ?? 0,
            });
        };
        load();
    }, []);

    const cards = [
        {
            to: '/admin/administraciones',
            label: 'Administraciones',
            count: stats.administrations,
            icon: '🗳️',
            color: 'bg-blue-50 text-blue-700',
        },
        {
            to: '/admin/noticias',
            label: 'Noticias',
            count: stats.news,
            icon: '📰',
            color: 'bg-amber-50 text-amber-700',
        },
        {
            to: '/admin/documentos',
            label: 'Documentos',
            count: stats.documents,
            icon: '📄',
            color: 'bg-emerald-50 text-emerald-700',
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">
                Resumen del contenido publicado en el portal.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                {cards.map((c) => (
                    <Link
                        key={c.to}
                        to={c.to}
                        className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
                    >
                        <div className={`inline-flex rounded-lg p-2 text-xl ${c.color}`}>
                            {c.icon}
                        </div>
                        <p className="mt-3 text-3xl font-bold text-gray-900">{c.count}</p>
                        <p className="text-sm text-gray-500">{c.label}</p>
                    </Link>
                ))}
            </div>

            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
                <h2 className="font-bold text-blue-900">💡 Consejos rápidos</h2>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-800">
                    <li>Usa el campo "Orden" en las administraciones para controlar cómo aparecen en la portada.</li>
                    <li>Los PDFs se almacenan de forma privada; solo los vecinos logueados pueden verlos.</li>
                    <li>Los cambios se reflejan inmediatamente para todos los vecinos.</li>
                </ul>
            </div>
        </div>
    );
};