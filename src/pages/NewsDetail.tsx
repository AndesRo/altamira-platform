// src/pages/NewsDetail.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNewsById } from '../hooks/useNews';
import { Loading } from '../components/Loading';
import { PdfViewer } from '../components/PdfViewer';
import { resolveFileUrl } from '../utils/storage';

export const NewsDetail = () => {
    const { id } = useParams();
    const { data, loading, error } = useNewsById(id);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [showPdf, setShowPdf] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false);

    // Resolver URLs firmadas
    useEffect(() => {
        let cancelled = false;
        if (data?.image_url) {
            resolveFileUrl(data.image_url).then((u) => {
                if (!cancelled) setImgUrl(u);
            });
        }
        return () => {
            cancelled = true;
        };
    }, [data?.image_url]);

    const handleViewPdf = async () => {
        if (!data?.pdf_url) return;
        setLoadingPdf(true);
        const url = await resolveFileUrl(data.pdf_url);
        setLoadingPdf(false);
        if (url) {
            setPdfUrl(url);
            setShowPdf(true);
        } else {
            alert('No se pudo cargar el PDF.');
        }
    };

    if (loading) return <Loading />;

    if (error || !data) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Noticia no encontrada.
            </div>
        );
    }

    return (
        <article className="mx-auto max-w-3xl">
            <Link
                to="/noticias"
                className="mb-4 inline-block text-sm font-medium text-primary-600 hover:underline"
            >
                ← Volver a noticias
            </Link>
            <p className="text-sm text-gray-400">
                {new Date(data.published_at).toLocaleDateString('es-CL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })}
            </p>
            <h1 className="mt-1 text-3xl font-extrabold text-gray-900">
                {data.title}
            </h1>

            {imgUrl && (
                <img
                    src={imgUrl}
                    alt={data.title}
                    className="mt-4 w-full rounded-xl object-cover"
                />
            )}

            <div className="prose prose-sm mt-6 max-w-none whitespace-pre-line text-gray-700">
                {data.content}
            </div>

            {/* 📄 PDF adjunto */}
            {data.pdf_url && (
                <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
                    <p className="font-semibold text-red-900">
                        📄 Documento adjunto
                    </p>
                    <p className="mt-1 text-sm text-red-800">
                        Esta noticia incluye un documento PDF que puedes consultar.
                    </p>
                    <button
                        onClick={handleViewPdf}
                        disabled={loadingPdf}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60"
                    >
                        {loadingPdf ? 'Cargando...' : 'Ver documento PDF'}
                    </button>
                </div>
            )}

            {/* 📋 Formulario externo */}
            {data.external_url && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="font-semibold text-emerald-900">
                        📋 Formulario asociado
                    </p>
                    <p className="mt-1 text-sm text-emerald-800">
                        Completa el formulario para participar o responder.
                    </p>
                    <a
                        href={data.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        Abrir formulario
                        <span>↗</span>
                    </a>
                </div>
            )}

            {/* Visor PDF */}
            {showPdf && pdfUrl && (
                <PdfViewer fileUrl={pdfUrl} onClose={() => setShowPdf(false)} />
            )}
        </article>
    );
};