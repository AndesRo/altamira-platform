// src/pages/News.tsx
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { Loading } from '../components/Loading';

export const NewsPage = () => {
    const { data, loading, error } = useNews();

    if (loading) return <Loading message="Cargando noticias..." />;

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Error al cargar noticias: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Últimas noticias</h1>
                <p className="text-sm text-gray-500">
                    Novedades y avisos de la comunidad del Edificio Altamira.
                </p>
            </header>

            {data.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                    No hay noticias publicadas todavía.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {data.map((n) => (
                        <Link
                            key={n.id}
                            to={`/noticias/${n.id}`}
                            className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-primary-300 hover:shadow-md"
                        >
                            <p className="text-xs text-gray-400">
                                {new Date(n.published_at).toLocaleDateString('es-CL', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-primary-700">
                                {n.title}
                            </h2>
                            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                {n.content}
                            </p>
                            <span className="mt-3 inline-block text-sm font-medium text-primary-600">
                                Leer más →
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};