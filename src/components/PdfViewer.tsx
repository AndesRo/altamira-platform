import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

interface Props {
    fileUrl: string;
    onClose: () => void;
}

export const PdfViewer = ({ fileUrl, onClose }: Props) => {
    const [numPages, setNumPages] = useState<number | null>(null);

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
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        loading={<p className="text-sm text-gray-500">Cargando PDF...</p>}
                        error={
                            <p className="text-sm text-red-500">
                                No se pudo cargar el PDF. Verifica el enlace.
                            </p>
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