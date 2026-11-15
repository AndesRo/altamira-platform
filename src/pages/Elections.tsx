// src/pages/Elections.tsx
import { useState } from 'react';
import { useAdministrations } from '../hooks/useAdministrations';
import { useNews } from '../hooks/useNews'; // 👈 Importar hook de noticias
import { Loading } from '../components/Loading';
import { PdfViewer } from '../components/PdfViewer';
import { resolveFileUrl } from '../utils/storage';
import { Administration } from '../types';
import { NewsCarousel } from '../components/NewsCarousel'; // 👈 Importar carrusel

export const Elections = () => {
    const { data, loading, error } = useAdministrations();
    const { data: newsData, loading: loadingNews } = useNews(); // 👈 Obtener noticias

    const [pdfToShow, setPdfToShow] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [loadingPdfId, setLoadingPdfId] = useState<string | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);

    const handleViewPdf = async (id: string, path: string) => {
        setPdfError(null);
        setLoadingPdfId(id);

        const url = await resolveFileUrl(path);

        setLoadingPdfId(null);

        if (url) {
            setPdfToShow(url);
        } else {
            setPdfError(
                'No se pudo cargar la propuesta de servicios. Verifica que el archivo exista en Storage.'
            );
            setTimeout(() => setPdfError(null), 5000);
        }
    };

    if (loading || loadingNews) return <Loading message="Cargando portal..." />;
    if (error)
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Error al cargar: {error}
            </div>
        );

    // Tomamos solo las 4 noticias más recientes para el carrusel
    const latestNews = newsData?.slice(0, 4) || [];

    return (
        <div className="space-y-8">
            {/* 👇 SECCIÓN DEL BANNER PRINCIPAL 👇 */}
            {latestNews.length > 0 ? (
                <NewsCarousel news={latestNews} />
            ) : (
                /* Fallback: Si no hay noticias, se muestra tu Hero estático original */
                <section className="relative overflow-hidden rounded-2xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/edificio-altamira.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-primary-900/70" />
                    <div className="relative px-6 py-14 text-white sm:px-10 sm:py-20">
                        <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                            Elecciones 2026
                        </span>
                        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
                            Elección de la nueva administración
                        </h1>
                        <p className="mt-4 max-w-2xl text-white/90">
                            Conoce las propuestas de cada administración participante. La
                            votación será <strong>presencial</strong> en el salón comunal.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-400/90 px-4 py-2 text-sm font-semibold text-amber-950">
                            📍 Votación presencial · Información 100% oficial
                        </div>
                    </div>
                </section>
            )}

            {/* Error al cargar PDF */}
            {pdfError && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    ❌ {pdfError}
                </div>
            )}

            {/* Listado de candidaturas (Se mantiene intacto) */}
            <section>
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Administraciones participantes
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Revisa el resumen de cada propuesta y descarga el documento completo
                        para conocer el plan de servicios.
                    </p>
                </div>

                {data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                        Aún no se han publicado administraciones participantes.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {data.map((admin) => (
                            <AdministrationCard
                                key={admin.id}
                                admin={admin}
                                expanded={expandedId === admin.id}
                                onToggle={() =>
                                    setExpandedId(expandedId === admin.id ? null : admin.id)
                                }
                                onViewPdf={() =>
                                    admin.pdf_url && handleViewPdf(admin.id, admin.pdf_url)
                                }
                                loadingPdf={loadingPdfId === admin.id}
                            />
                        ))}
                    </div>
                )}
            </section>

            {pdfToShow && (
                <PdfViewer fileUrl={pdfToShow} onClose={() => setPdfToShow(null)} />
            )}
        </div>
    );
};
// ... (Mantén el componente AdministrationCard tal cual lo tenías)
/* ============================================================ */
/* TARJETA DE ADMINISTRACIÓN PARTICIPANTE (CORREGIDA)           */
/* ============================================================ */
const AdministrationCard = ({
    admin,
    expanded,
    onToggle,
    onViewPdf,
    loadingPdf,
}: {
    admin: Administration;
    expanded: boolean;
    onToggle: () => void;
    onViewPdf: () => void;
    loadingPdf: boolean;
}) => (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
        {/* Header con badge y nombre */}
        <div className="border-b border-gray-100 bg-gradient-to-br from-primary-50 to-white px-6 py-5">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white shadow-sm">
                    {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
                        Candidatura
                    </span>
                    <h3 className="mt-1 text-lg font-bold leading-tight text-gray-900 break-words">
                        {admin.name}
                    </h3>
                    {admin.contact_name && (
                        <p className="mt-1 text-xs text-gray-500 break-words">
                            👤 Contacto: {admin.contact_name}
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Cuerpo con resumen */}
        <div className="flex flex-1 flex-col px-6 py-5 w-full overflow-hidden">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Resumen de la propuesta
            </p>

            {/* Contenedor del Resumen con break-words y w-full */}
            <div
                className={`prose prose-sm mt-2 w-full max-w-full break-words text-[15px] leading-relaxed text-gray-700 text-justify ${expanded ? '' : 'line-clamp-5'
                    }`}
                dangerouslySetInnerHTML={{ __html: admin.summary }}
            />

            {expanded && admin.full_description && (
                <div className="mt-4 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Detalle de la propuesta
                    </p>
                    {/* Contenedor del Detalle con break-words y w-full */}
                    <div
                        className="prose prose-sm w-full max-w-full break-words text-[15px] leading-relaxed text-gray-700 text-justify"
                        dangerouslySetInnerHTML={{ __html: admin.full_description }}
                    />
                </div>
            )}

            {/* Acciones */}
            <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
                <button
                    onClick={onToggle}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                    {expanded ? 'Ocultar resumen' : 'Leer resumen completo'}
                </button>

                {admin.pdf_url && (
                    <button
                        onClick={onViewPdf}
                        disabled={loadingPdf}
                        className="flex-1 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loadingPdf ? 'Cargando...' : '📄 Ver propuesta de servicios'}
                    </button>
                )}
            </div>

            {!admin.pdf_url && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    ℹ️ Esta candidatura aún no ha adjuntado el documento de propuesta.
                </p>
            )}
        </div>
    </article>
);