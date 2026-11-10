import { useState } from 'react';
import { uploadFile, deleteFile } from '../../utils/storage';
import { resolveFileUrl } from '../../utils/storage';
import { useEffect } from 'react';

interface FileUploadProps {
    folder: string;
    currentPath: string | null;
    onUploaded: (path: string | null) => void;
    accept?: string;
    label?: string;
    showPreview?: boolean;
}

export const FileUpload = ({
    folder,
    currentPath,
    onUploaded,
    accept = 'application/pdf',
    label = 'Archivo PDF',
    showPreview = false,
}: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Resolver URL firmada para preview (solo si es imagen)
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            if (showPreview && currentPath) {
                const url = await resolveFileUrl(currentPath);
                if (!cancelled) setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [currentPath, showPreview]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        if (currentPath && !currentPath.startsWith('http')) {
            await deleteFile('pdfs', currentPath);
        }

        const { path, error } = await uploadFile('pdfs', folder, file);
        setUploading(false);

        if (error) setError(error);
        else onUploaded(path);
    };

    const handleRemove = async () => {
        if (currentPath && !currentPath.startsWith('http')) {
            await deleteFile('pdfs', currentPath);
        }
        onUploaded(null);
    };

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>

            {currentPath ? (
                <div className="overflow-hidden rounded-lg border border-green-300 bg-green-50">
                    {showPreview && previewUrl && (
                        <div className="flex h-32 items-center justify-center bg-gray-100">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between px-3 py-3">
                        <div className="flex items-center gap-2 truncate">
                            <span className="text-xl">{showPreview ? '🖼️' : '📄'}</span>
                            <span className="truncate text-sm font-medium text-green-900">
                                {currentPath.split('/').pop()}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="ml-3 rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ) : (
                <label
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition ${uploading
                            ? 'border-gray-300 bg-gray-100'
                            : 'border-blue-400 bg-blue-50 hover:border-blue-600 hover:bg-blue-100'
                        }`}
                >
                    <span className="text-3xl">{uploading ? '⏳' : '📤'}</span>
                    <span className="mt-2 text-sm font-semibold text-blue-700">
                        {uploading ? 'Subiendo archivo...' : 'Haz clic para subir un archivo'}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">
                        {accept === 'image/*' ? 'JPG, PNG o WEBP · máx. 5 MB' : 'Solo PDF · máx. 10 MB'}
                    </span>
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
            )}

            {error && (
                <p className="mt-2 rounded bg-red-50 px-2 py-1 text-xs text-red-600">
                    ❌ {error}
                </p>
            )}
        </div>
    );
};