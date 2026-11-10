import { useState } from 'react';
import { uploadFile, deleteFile } from '../../utils/storage';

interface FileUploadProps {
    folder: string;
    currentPath: string | null;
    onUploaded: (path: string | null) => void;
    accept?: string;
    label?: string;
}

export const FileUpload = ({
    folder,
    currentPath,
    onUploaded,
    accept = 'application/pdf',
    label = 'Archivo PDF',
}: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        // Elimina el anterior si existía
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>

            {currentPath ? (
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                    <span className="truncate text-sm text-gray-700">
                        ✅ {currentPath.split('/').pop()}
                    </span>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="ml-2 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                        Eliminar
                    </button>
                </div>
            ) : (
                <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm text-gray-500 hover:border-primary-400 hover:bg-primary-50/30">
                    {uploading ? 'Subiendo...' : 'Haz clic para subir un archivo'}
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
            )}

            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};