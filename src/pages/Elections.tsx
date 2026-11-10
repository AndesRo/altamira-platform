import { useState } from 'react';
import { useAdministrations } from '../hooks/useAdministrations';
import { Loading } from '../components/Loading';
import { PdfViewer } from '../components/PdfViewer';
import { Administration } from '../types';

export const Elections = () => {
    const { data, loading, error } = useAdministrations();
    const [pdfToShow, setPdfToShow] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (loading) return <Loading message="Cargando candidaturas..." />;
    if (error)
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Error al cargar: {error}
            </div>
        );

    return (
        <div className="space-y-8">
            {/* Hero */}
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
                        Revisa cada plan, su resumen y el documento completo en PDF.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-400/90 px-4 py-2 text-sm font-semibold text-amber-950">
                        📍 Votación presencial · Información 100% oficial
                    </div>
                </div>
            </section>

            {/* Listado de candidaturas */}
            <section>
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Administraciones participantes
                </h2>

                {data.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                        Aún no se han publicado administraciones participantes.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {data.map((admin) => (
                            <AdministrationCard
                                key={admin.id}
                                admin={admin}
                                expanded={expandedId === admin.id}
                                onToggle={() =>
                                    setExpandedId(expandedId === admin.id ? null : admin.id)
                                }
                                onViewPdf={() => setPdfToShow(admin.pdf_url)}
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

const AdministrationCard = ({
    admin,
    expanded,
    onToggle,
    onViewPdf,
}: {
    admin: Administration;
    expanded: boolean;
    onToggle: () => void;
    onViewPdf: () => void;
}) => (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 text-lg font-bold text-primary-700">
                {admin.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <h3 className="font-bold text-gray-900">{admin.name}</h3>
                {admin.contact_name && (
                    <p className="text-xs text-gray-500">Contacto: {admin.contact_name}</p>
                )}
            </div>
        </div>

        <p
            className={`text-sm text-gray-600 ${expanded ? '' : 'line-clamp-4'
                }`}
        >
            {admin.summary}
        </p>

        {expanded && admin.full_description && (
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                {admin.full_description}
            </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 pt-2">
            <button
                onClick={onToggle}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
                {expanded ? 'Ver menos' : 'Ver resumen'}
            </button>
            {admin.pdf_url && (
                <button
                    onClick={onViewPdf}
                    className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                >
                    Ver PDF
                </button>
            )}
        </div>
    </article>
);