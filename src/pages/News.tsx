// src/pages/News.tsx
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { Loading } from '../components/Loading';
import { News } from '../types';

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
                        <NewsCard key={n.id} news={n} />
                    ))}
                </div>
            )}
        </div>
    );
};

/* ============================================================
   Tarjeta de noticia con soporte de enlace externo
   ============================================================ */
const NewsCard = ({ news }: { news: News }) => {
    const hasExternalLink = !!news.external_url;

    const cardContent = (
        <>
            {/* Imagen (si existe) */}
            {news.image_url && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                        src={news.image_url}
                        alt={news.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {hasExternalLink && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                            📋 Formulario
                        </span>
                    )}
                </div>
            )}

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-gray-400">
                    {new Date(news.published_at).toLocaleDateString('es-CL', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
                <h2 className="mt-1 text-lg font-bold text-gray-900 transition group-hover:text-primary-700">
                    {news.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {news.content}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-all group-hover:gap-2">
                    {hasExternalLink ? 'Ir al formulario' : 'Leer más'}
                    <span>→</span>
                </span>
            </div>
        </>
    );

    // Si hay URL externa → la tarjeta entera abre el formulario
    if (hasExternalLink) {
        return (
            <a
                href={news.external_url!}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-primary-300 hover:shadow-md"
            >
                {cardContent}
            </a>
        );
    }

    // Si no hay URL externa → mantiene comportamiento original (detalle interno)
    return (
        <Link
            to={`/noticias/${news.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-primary-300 hover:shadow-md"
        >
            {cardContent}
        </Link>
    );
};