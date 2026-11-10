// src/pages/Documents.tsx
import { useMemo, useState } from 'react';
import { useDocuments } from '../hooks/useDocuments';
import { Loading } from '../components/Loading';
import { PdfViewer } from '../components/PdfViewer';
import { resolveFileUrl } from '../utils/storage';

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
                <p className="text-sm text-gray-500">
                    Reglamentos, actas y documentos oficiales de la comunidad.
                </p>
            </header>

            {/* Filtros por categoría */}
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

            {/* Mensaje de error global al cargar un PDF */}
            {pdfError && (
                <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                    {pdfError}
                </div>
            )}

            {/* Listado */}
            {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                    No hay documentos en esta categoría.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {filtered.map((doc) => (
                        <div
                            key={doc.id}
                            className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
                        >
                            <span className="mb-2 inline-block w-fit rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                                {doc.category}
                            </span>
                            <h3 className="font-bold text-gray-900">{doc.title}</h3>
                            {doc.description && (
                                <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                            )}
                            <p className="mt-2 text-xs text-gray-400">
                                Subido el{' '}
                                {new Date(doc.uploaded_at).toLocaleDateString('es-CL', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                            <button
                                onClick={() => handleViewPdf(doc.id, doc.file_url)}
                                disabled={loadingPdfId === doc.id}
                                className="mt-4 w-fit rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
                            >
                                {loadingPdfId === doc.id
                                    ? 'Cargando PDF...'
                                    : 'Ver documento'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Visor de PDF */}
            {pdfToShow && (
                <PdfViewer fileUrl={pdfToShow} onClose={() => setPdfToShow(null)} />
            )}
        </div>
    );
};