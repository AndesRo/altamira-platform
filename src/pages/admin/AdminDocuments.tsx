import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminDocuments } from '../../hooks/useAdminDocuments';
import { DocumentItem } from '../../types';
import { Modal } from '../../components/admin/Modal';
import { FileUpload } from '../../components/admin/FileUpload';
import { Loading } from '../../components/Loading';

const empty: Partial<DocumentItem> = {
    title: '',
    description: '',
    category: 'General',
    file_url: '',
    cover_image_url: null,
};

const categories = ['General', 'Reglamento', 'Acta', 'Financiero', 'Otro'];

export const AdminDocuments = () => {
    const { create, update, remove, loading } = useAdminDocuments();
    const [items, setItems] = useState<DocumentItem[]>([]);
    const [fetching, setFetching] = useState(true);
    const [editing, setEditing] = useState<DocumentItem | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState<Partial<DocumentItem>>(empty);

    const reload = async () => {
        setFetching(true);
        const { data } = await supabase
            .from('documents')
            .select('*')
            .order('uploaded_at', { ascending: false });
        setItems(data ?? []);
        setFetching(false);
    };

    useEffect(() => {
        reload();
    }, []);

    const openNew = () => {
        setEditing(null);
        setForm(empty);
        setFormOpen(true);
    };

    const openEdit = (item: DocumentItem) => {
        setEditing(item);
        setForm(item);
        setFormOpen(true);
    };

    const handleSave = async () => {
        if (!form.file_url) {
            alert('Debes subir un archivo PDF.');
            return;
        }
        const payload = {
            title: form.title ?? '',
            description: form.description ?? null,
            category: form.category ?? 'General',
            file_url: form.file_url,
            cover_image_url: form.cover_image_url ?? null,
        };
        const { error } = editing
            ? await update(editing.id, payload)
            : await create(payload);
        if (!error) {
            setFormOpen(false);
            await reload();
        }
    };

    const handleDelete = async (item: DocumentItem) => {
        if (!confirm(`¿Eliminar "${item.title}"?`)) return;
        await remove(item.id);
        await reload();
    };

    if (fetching) return <Loading />;

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Documentos</h1>
                    <p className="text-sm text-gray-500">
                        Reglamentos, actas y documentos oficiales.
                    </p>
                </div>
                <button
                    onClick={openNew}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                >
                    + Nuevo
                </button>
            </div>

            <div className="mt-6 space-y-3">
                {items.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                        No hay documentos cargados.
                    </p>
                ) : (
                    items.map((it) => (
                        <div
                            key={it.id}
                            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                        >
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-block rounded bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
                                        {it.category}
                                    </span>
                                    {it.cover_image_url && (
                                        <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                            🖼️ Portada
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 truncate font-semibold text-gray-900">
                                    {it.title}
                                </p>
                                {it.description && (
                                    <p className="line-clamp-1 text-sm text-gray-500">
                                        {it.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => openEdit(it)}
                                    className="rounded px-2 py-1 text-xs text-primary-600 hover:bg-primary-50"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(it)}
                                    className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                title={editing ? 'Editar documento' : 'Nuevo documento'}
                size="lg"
            >
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Título *
                            </label>
                            <input
                                type="text"
                                value={form.title ?? ''}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Categoría
                            </label>
                            <select
                                value={form.category ?? 'General'}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            >
                                {categories.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            rows={3}
                            value={form.description ?? ''}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Portada (imagen) */}
                    <FileUpload
                        folder="documents/covers"
                        currentPath={form.cover_image_url ?? null}
                        onUploaded={(path) =>
                            setForm({ ...form, cover_image_url: path })
                        }
                        accept="image/*"
                        label="Imagen de portada (opcional)"
                        showPreview
                    />

                    {/* PDF */}
                    <FileUpload
                        folder="documents"
                        currentPath={form.file_url ?? null}
                        onUploaded={(path) => setForm({ ...form, file_url: path ?? '' })}
                        label="Archivo PDF *"
                    />

                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                        <button
                            onClick={() => setFormOpen(false)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading || !form.title || !form.file_url}
                            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};