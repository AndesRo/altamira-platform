// src/pages/admin/AdminContact.tsx
import { useEffect, useState } from 'react';
import { useAdminContactInfo } from '../../hooks/useAdminContactInfo';
import { Loading } from '../../components/Loading';
import { ContactInfo } from '../../types';

type FormState = Omit<ContactInfo, 'id' | 'updated_at'>;

const empty: FormState = {
    admin_phone: '',
    admin_email: '',
    admin_hours: '',
    address: '',
    whatsapp_url: '',
    conserjeria_phone: '',
    conserjeria_hours: '',
    emergencies_note: '',
};

export const AdminContact = () => {
    const { data, loading, saving, error, update } = useAdminContactInfo();
    const [form, setForm] = useState<FormState>(empty);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (data) {
            const { id, updated_at, ...rest } = data;
            setForm(rest);
        }
    }, [data]);

    const handleChange = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setSuccess(false);
    };

    const handleSave = async () => {
        const { error } = await update(form);
        if (!error) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    if (loading) return <Loading message="Cargando información..." />;

    return (
        <div className="mx-auto max-w-3xl">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Información de contacto
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Datos que se muestran a los vecinos en la página de contacto.
                </p>
            </header>

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    ❌ {error}
                </div>
            )}

            {success && (
                <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    ✅ Cambios guardados correctamente.
                </div>
            )}

            <div className="space-y-6">
                {/* Administración */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
                        Administración
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                value={form.admin_phone}
                                onChange={(e) => handleChange('admin_phone', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="+56 9 0000 0000"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Correo
                            </label>
                            <input
                                type="email"
                                value={form.admin_email}
                                onChange={(e) => handleChange('admin_email', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="administracion@altamira.cl"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Horario de atención
                            </label>
                            <input
                                type="text"
                                value={form.admin_hours}
                                onChange={(e) => handleChange('admin_hours', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Lun a Vie · 09:00 a 18:00"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Dirección
                            </label>
                            <input
                                type="text"
                                value={form.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Av. Altamira 1234, Santiago"
                            />
                        </div>
                    </div>
                </section>

                {/* WhatsApp */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
                        Grupo de WhatsApp
                    </h2>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            URL del grupo
                        </label>
                        <input
                            type="url"
                            value={form.whatsapp_url}
                            onChange={(e) => handleChange('whatsapp_url', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            placeholder="https://chat.whatsapp.com/..."
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Pega aquí el enlace de invitación del grupo.
                        </p>
                    </div>
                </section>

                {/* Conserjería y emergencias */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
                        Conserjería y emergencias
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Teléfono conserjería
                            </label>
                            <input
                                type="text"
                                value={form.conserjeria_phone}
                                onChange={(e) =>
                                    handleChange('conserjeria_phone', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="+56 9 1111 2222"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Horario conserjería
                            </label>
                            <input
                                type="text"
                                value={form.conserjeria_hours}
                                onChange={(e) =>
                                    handleChange('conserjeria_hours', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="Atención 24/7"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Nota de emergencias
                            </label>
                            <input
                                type="text"
                                value={form.emergencies_note}
                                onChange={(e) =>
                                    handleChange('emergencies_note', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                placeholder="También 132 (Bomberos) · 131 (Ambulancia)"
                            />
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    {data && (
                        <p className="text-xs text-gray-400">
                            Última actualización:{' '}
                            {new Date(data.updated_at).toLocaleString('es-CL')}
                        </p>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-60"
                    >
                        {saving ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
            </div>
        </div>
    );
};