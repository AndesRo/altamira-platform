// src/components/NewsCarousel.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { News } from '../types';
import { resolveFileUrl } from '../utils/storage';

export const NewsCarousel = ({ news }: { news: News[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-deslizamiento cada 5 segundos
    useEffect(() => {
        if (news.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % news.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [news.length]);

    // Si no hay noticias, no renderizamos nada (se usará el Hero por defecto)
    if (!news || news.length === 0) return null;

    return (
        <section className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg">
            <div className="relative h-[300px] w-full sm:h-[400px]">
                {news.map((item, index) => (
                    <CarouselSlide
                        key={item.id}
                        news={item}
                        isActive={index === currentIndex}
                    />
                ))}
            </div>

            {/* Controles de navegación (Puntos) */}
            {news.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                    {news.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Ir a la noticia ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

/* Subcomponente para cada diapositiva (maneja la carga de la imagen) */
const CarouselSlide = ({ news, isActive }: { news: News; isActive: boolean }) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        if (news.image_url) {
            resolveFileUrl(news.image_url).then((url) => {
                if (!cancelled) setImgUrl(url);
            });
        }
        return () => { cancelled = true; };
    }, [news.image_url]);

    const hasExternalLink = !!news.external_url;

    return (
        <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
        >
            {/* Imagen de fondo */}
            {imgUrl ? (
                <img
                    src={imgUrl}
                    alt={news.title}
                    className="h-full w-full object-cover"
                />
            ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary-900 to-slate-900" />
            )}

            {/* Overlay para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />

            {/* Contenido */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                <div className="max-w-2xl">
                    <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950 shadow-sm mb-3">
                        🔥 Última hora
                    </span>
                    <h2 className="text-2xl font-extrabold text-white sm:text-4xl leading-tight drop-shadow-md">
                        {news.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-200 sm:text-base drop-shadow">
                        {news.content}
                    </p>

                    <div className="mt-5">
                        {hasExternalLink ? (
                            <a
                                href={news.external_url!}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-gray-100"
                            >
                                Ir al formulario
                                <span>↗</span>
                            </a>
                        ) : (
                            <Link
                                to={`/noticias/${news.id}`}
                                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-700"
                            >
                                Leer noticia completa
                                <span>→</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};