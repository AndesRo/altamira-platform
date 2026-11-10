import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminNews } from '../../hooks/useAdminNews';
import { News } from '../../types';
import { Modal } from '../../components/admin/Modal';
import { Loading } from '../../components/Loading';

const empty: Partial<News> = {
    title: '',
    content: '',
    image_url: null,
};

export const AdminNews = () => {
    const { create, update, remove, loading } = useAdminNews();
    const [items, setItems] = useState<News[]>([]);
    const [fetching, setFetching] = useState(true);
    const [editing, setEditing] = useState<News | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState<Partial<News>>(empty);

    const reload = async () => {
        setFetching(true);
        const { data } = await supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false });
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

    const openEdit = (item: News) => {
        setEditing(item);
        setForm(item);
        setFormOpen(true);
    };

    const handleSave = async () => {
        const payload = {
            title: form.title ?? '',
            content: form.content ?? '',
            image_url: form.image_url ?? null,
        };
        const { error } = editing
            ? await update(editing.id, payload)
            : await create(payload);
        if (!error) {
            setFormOpen(false);
            await reload();
        }
    };

    const handleDelete = async (item: News) => {
        if (!confirm(`¿Eliminar "${item.title}"?`)) return;
        await remove(item.id);
        await reload();
    };

    if (fetching) return <Loading />;

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Noticias</h1>
                    <p className="text-sm text-gray-500">Avisos y novedades para los vecinos.</p>
                </div>
                <button
                    onClick={openNew}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                >
                    + Nueva
                </button>
            </div>

            <div className="mt-6 space-y-3">
                {items.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                        No hay noticias publicadas.
                    </p>
                ) : (
                    items.map((it) => (
                        <div
                            key={it.id}
                            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
                        >
                            <div>
                                <p className="text-xs text-gray-400">
                                    {new Date(it.published_at).toLocaleDateString('es-CL')}
                                </p>
                                <p className="font-semibold text-gray-900">{it.title}</p>
                                <p className="line-clamp-1 text-sm text-gray-500">{it.content}</p>
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
                title={editing ? 'Editar noticia' : 'Nueva noticia'}
                size="lg"
            >
                <div className="space-y-4">
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
                            Contenido *
                        </label>
                        <textarea
                            rows={8}
                            value={form.content ?? ''}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Contenido de la noticia. Usa saltos de línea para separar párrafos."
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            URL de imagen (opcional)
                        </label>
                        <input
                            type="url"
                            value={form.image_url ?? ''}
                            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                        <button
                            onClick={() => setFormOpen(false)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading || !form.title || !form.content}
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