import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// ✅ Configuración del worker vía CDN (100% compatible con Vite dev y build)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface Props {
    fileUrl: string;
    onClose: () => void;
}

export const PdfViewer = ({ fileUrl, onClose }: Props) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={onClose}
        >
            <div
                className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                    <p className="font-semibold text-gray-800">Vista previa del PDF</p>
                    <button
                        onClick={onClose}
                        className="rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Cerrar ✕
                    </button>
                </div>

                <div className="overflow-auto p-4">
                    <Document
                        file={fileUrl}
                        onLoadSuccess={({ numPages }) => {
                            setNumPages(numPages);
                            setErrorMsg(null);
                        }}
                        onLoadError={(err) => {
                            console.error('PDF load error:', err);
                            setErrorMsg(
                                'No se pudo cargar el PDF. Verifica el enlace o el archivo.'
                            );
                        }}
                        loading={
                            <p className="py-8 text-center text-sm text-gray-500">
                                Cargando PDF...
                            </p>
                        }
                        error={
                            <div className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-700">
                                {errorMsg || 'Error al cargar el PDF'}
                                <p className="mt-2 text-xs text-gray-500">
                                    Prueba abriéndolo en una pestaña nueva o revisa la consola (F12).
                                </p>
                            </div>
                        }
                    >
                        {Array.from({ length: numPages ?? 0 }, (_, i) => (
                            <div key={i} className="mb-4 flex justify-center">
                                <Page
                                    pageNumber={i + 1}
                                    width={Math.min(window.innerWidth - 80, 720)}
                                />
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};