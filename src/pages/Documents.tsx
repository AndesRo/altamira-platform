// src/pages/Documents.tsx
import { useMemo, useState } from 'react';
import { useDocuments } from '../hooks/useDocuments';
import { Loading } from '../components/Loading';
import { PdfViewer } from '../components/PdfViewer';
import { resolveFileUrl } from '../utils/storage';
import { useEffect } from 'react';

/* ============================================================
   Metadatos visuales por categoría
   ============================================================ */
const CATEGORY_META: Record<
    string,
    { icon: string; gradient: string; subtitle: string }
> = {
    Reglamento: {
        icon: '📜',
        gradient: 'from-blue-600 via-blue-700 to-blue-900',
        subtitle: 'Normativa interna',
    },
    Acta: {
        icon: '📝',
        gradient: 'from-purple-600 via-purple-700 to-purple-900',
        subtitle: 'Registro oficial',
    },
    Financiero: {
        icon: '💰',
        gradient: 'from-emerald-600 via-emerald-700 to-emerald-900',
        subtitle: 'Información contable',
    },
    Otro: {
        icon: '📎',
        gradient: 'from-amber-600 via-amber-700 to-amber-900',
        subtitle: 'Documento adicional',
    },
    General: {
        icon: '📁',
        gradient: 'from-slate-600 via-slate-700 to-slate-900',
        subtitle: 'Documento general',
    },
};

const getCategoryMeta = (cat: string) =>
    CATEGORY_META[cat] ?? CATEGORY_META.General;

/* ============================================================
   Portada del documento (imagen real o fallback gradiente)
   ============================================================ */
const DocumentCover = ({
    imagePath,
    category,
}: {
    imagePath: string | null;
    category: string;
}) => {
    const meta = getCategoryMeta(category);
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        if (imagePath) {
            resolveFileUrl(imagePath).then((url) => {
                if (!cancelled) setImgUrl(url);
            });
        } else {
            setImgUrl(null);
        }
        return () => {
            cancelled = true;
        };
    }, [imagePath]);

    // Si hay imagen, la mostramos con los badges superpuestos
    if (imgUrl) {
        return (
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <img
                    src={imgUrl}
                    alt="Portada del documento"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <span className="absolute right-3 top-3 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
                    PDF
                </span>

                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 shadow">
                    {category}
                </span>
            </div>
        );
    }

    // Fallback: gradiente por categoría
    return (
        <div
            className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${meta.gradient}`}
        >
            <div className="pointer-events-none absolute inset-0 opacity-10">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white" />
                <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white" />
            </div>

            <span className="relative text-6xl drop-shadow-lg">{meta.icon}</span>

            <span className="absolute right-3 top-3 rounded-md bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
                PDF
            </span>

            <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 shadow">
                {category}
            </span>

            <span className="absolute bottom-3 right-3 text-[11px] font-medium text-white/90">
                {meta.subtitle}
            </span>
        </div>
    );
};

/* ============================================================
   Página
   ============================================================ */
export const Documents = () => {
    const { data, loading, error } = useDocuments();
    const [category, setCategory] = useState<string>('Todos');
    const [pdfToShow, setPdfToShow] = useState<string | null>(null);
    const [loadingPdfId, setLoadingPdfId] = useState<string | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);

    const categories = useMemo(() => {
        const set = new Set(data.map((d) => d.category));
        return ['Todos', ...Array.from(set)];
    }, [data]);

    const filtered = useMemo(
        () =>
            category === 'Todos'
                ? data
                : data.filter((d) => d.category === category),
        [data, category]
    );

    const handleViewPdf = async (id: string, path: string) => {
        setPdfError(null);
        setLoadingPdfId(id);
        const url = await resolveFileUrl(path);
        setLoadingPdfId(null);

        if (url) {
            setPdfToShow(url);
        } else {
            setPdfError('No se pudo cargar el documento. Intenta nuevamente.');
            setTimeout(() => setPdfError(null), 4000);
        }
    };

    if (loading) return <Loading message="Cargando documentos..." />;
    if (error)
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Error al cargar documentos: {error}
            </div>
        );

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Reglamentos, actas y documentos oficiales de la comunidad del Edificio
                    Altamira.
                </p>
            </header>

            {categories.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${category === c
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            )}

            {pdfError && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    ❌ {pdfError}
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                    No hay documentos en esta categoría.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {filtered.map((doc) => (
                        <article
                            key={doc.id}
                            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                        >
                            {/* 🖼️ Portada (imagen o fallback) */}
                            <DocumentCover
                                imagePath={doc.cover_image_url}
                                category={doc.category}
                            />

                            <div className="flex flex-1 flex-col px-6 py-5">
                                <h3 className="text-lg font-bold leading-tight text-gray-900">
                                    {doc.title}
                                </h3>

                                {doc.description && (
                                    <p className="mt-2 line-clamp-4 text-[15px] leading-relaxed text-gray-700 text-justify">
                                        {doc.description}
                                    </p>
                                )}

                                <p className="mt-3 text-xs text-gray-400">
                                    📅 Subido el{' '}
                                    {new Date(doc.uploaded_at).toLocaleDateString('es-CL', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>

                                <div className="mt-auto pt-4">
                                    <button
                                        onClick={() => handleViewPdf(doc.id, doc.file_url)}
                                        disabled={loadingPdfId === doc.id}
                                        className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loadingPdfId === doc.id
                                            ? 'Cargando documento...'
                                            : '📄 Ver documento'}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {pdfToShow && (
                <PdfViewer fileUrl={pdfToShow} onClose={() => setPdfToShow(null)} />
            )}
        </div>
    );
};