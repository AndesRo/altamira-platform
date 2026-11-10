import { supabase } from '../lib/supabase';

/**
 * Sube un archivo al bucket y devuelve el path relativo.
 * Ej: "administrations/1700000000-plan.pdf"
 */
export const uploadFile = async (
    bucket: string,
    folder: string,
    file: File
): Promise<{ path: string | null; error: string | null }> => {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${folder}/${Date.now()}-${cleanName}`;

    const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
    });

    if (error) return { path: null, error: error.message };
    return { path, error: null };
};

/**
 * Elimina un archivo del bucket.
 */
export const deleteFile = async (
    bucket: string,
    path: string
): Promise<void> => {
    await supabase.storage.from(bucket).remove([path]);
};

/**
 * Genera una URL firmada para un PDF almacenado.
 * Si el valor ya es una URL http completa, la devuelve tal cual.
 */
export const resolveFileUrl = async (
    pathOrUrl: string,
    expiresIn = 3600
): Promise<string | null> => {
    if (!pathOrUrl) return null;
    if (pathOrUrl.startsWith('http')) return pathOrUrl;

    const { data, error } = await supabase.storage
        .from('pdfs')
        .createSignedUrl(pathOrUrl, expiresIn);

    if (error || !data) return null;
    return data.signedUrl;
};