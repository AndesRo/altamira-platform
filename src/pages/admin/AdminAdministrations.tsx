import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminAdministrations } from '../../hooks/useAdminAdministrations';
import { Administration } from '../../types';
import { Modal } from '../../components/admin/Modal';
import { FileUpload } from '../../components/admin/FileUpload';
import { Loading } from '../../components/Loading';

const empty: Partial<Administration> = {
    name: '',
    summary: '',
    full_description: '',
    pdf_url: null,
    contact_name: '',
    order_index: 0,
};

export const AdminAdministrations = () => {
    const { create, update, remove, loading } = useAdminAdministrations();
    const [items, setItems] = useState<Administration[]>([]);
    const [fetching, setFetching] = useState(true);
    const [editing, setEditing] = useState<Administration | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState<Partial<Administration>>(empty);

    const reload = async () => {
        setFetching(true);
        const { data } = await supabase
            .from('administrations')
            .select('*')
            .order('order_index', { ascending: true });
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

    const openEdit = (item: Administration) => {
        setEditing(item);
        setForm(item);
        setFormOpen(true);
    };

    const handleSave = async () => {
        const payload = {
            name: form.name ?? '',
            summary: form.summary ?? '',
            full_description: form.full_description ?? null,
            pdf_url: form.pdf_url ?? null,
            contact_name: form.contact_name ?? null,
            order_index: form.order_index ?? 0,
        };

        const { error } = editing
            ? await update(editing.id, payload)
            : await create(payload);

        if (!error) {
            setFormOpen(false);
            await reload();
        }
    };

    const handleDelete = async (item: Administration) => {
        if (!confirm(`¿Eliminar "${item.name}"? Esta acción no se puede deshacer.`))
            return;
        await remove(item.id);
        await reload();
    };

    if (fetching) return <Loading />;

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Administraciones</h1>
                    <p className="text-sm text-gray-500">
                        Candidaturas para la elección de nueva administración.
                    </p>
                </div>
                <button
                    onClick={openNew}
                    className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                >
                    + Nueva
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
                {items.length === 0 ? (
                    <p className="p-8 text-center text-gray-500">
                        No hay administraciones registradas.
                    </p>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Orden</th>
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">PDF</th>
                                <th className="px-4 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((it) => (
                                <tr key={it.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-500">{it.order_index}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{it.name}</td>
                                    <td className="px-4 py-3">
                                        {it.pdf_url ? '✅' : '—'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => openEdit(it)}
                                            className="rounded px-2 py-1 text-xs text-primary-600 hover:bg-primary-50"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(it)}
                                            className="ml-1 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                title={editing ? 'Editar administración' : 'Nueva administración'}
                size="lg"
            >
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                value={form.name ?? ''}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Contacto
                            </label>
                            <input
                                type="text"
                                value={form.contact_name ?? ''}
                                onChange={(e) =>
                                    setForm({ ...form, contact_name: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Resumen breve *
                        </label>
                        <textarea
                            rows={3}
                            value={form.summary ?? ''}
                            onChange={(e) => setForm({ ...form, summary: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Resumen de las propuestas principales..."
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Descripción completa (opcional)
                        </label>
                        <textarea
                            rows={4}
                            value={form.full_description ?? ''}
                            onChange={(e) =>
                                setForm({ ...form, full_description: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Orden en la portada
                            </label>
                            <input
                                type="number"
                                value={form.order_index ?? 0}
                                onChange={(e) =>
                                    setForm({ ...form, order_index: Number(e.target.value) })
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>
                        <FileUpload
                            folder="administrations"
                            currentPath={form.pdf_url ?? null}
                            onUploaded={(path) => setForm({ ...form, pdf_url: path })}
                            label="Documento PDF de la propuesta"
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
                            disabled={loading || !form.name || !form.summary}
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