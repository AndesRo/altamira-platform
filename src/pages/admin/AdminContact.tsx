// src/pages/admin/AdminContact.tsx
import { useEffect, useState } from 'react';
import { useAdminContactInfo } from '../../hooks/useAdminContactInfo';
import { Loading } from '../../components/Loading';
import { ContactInfo } from '../../types';

type FormState = Omit<ContactInfo, 'id' | 'updated_at'>;

const empty: FormState = {
    admin_phone: '', admin_email: '', admin_hours: '', address: '', whatsapp_url: '',
    conserjeria_phone: '', conserjeria_hours: '', emergencies_note: '',
    moving_hours: '', moving_fee: '', moving_fee_desc: '', moving_coordination: '',
    moving_departure: '', moving_arrival: '', moving_bulky: '', moving_sanctions: '',
    email_admin: '', email_admin_desc: '', email_mayordomo: '', email_mayordomo_desc: '',
    email_conserje: '', email_conserje_desc: '',
    sched_may_lu: '', sched_may_ma: '', sched_may_mi: '', sched_may_ju: '', sched_may_vi: '', sched_may_sa: '',
    sched_break: '', sched_admin_title: '', sched_admin_hours: '', sched_admin_desc: '',
    sched_onsite_1: '', sched_onsite_2: '',
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
        <div className="mx-auto max-w-4xl pb-10">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Panel Informativo</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Administra los datos de contacto, reglas de mudanza y horarios que ven los vecinos.
                </p>
            </header>

            {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">❌ {error}</div>}
            {success && <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">✅ Cambios guardados correctamente.</div>}

            <div className="space-y-6">
                {/* SECCIÓN 1: CONTACTOS */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600">1. Contactos Principales</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Email Administración</label><input type="email" value={form.email_admin} onChange={(e) => handleChange('email_admin', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Descripción Admin</label><input type="text" value={form.email_admin_desc} onChange={(e) => handleChange('email_admin_desc', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Email Mayordomía</label><input type="email" value={form.email_mayordomo} onChange={(e) => handleChange('email_mayordomo', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Descripción Mayordomía</label><input type="text" value={form.email_mayordomo_desc} onChange={(e) => handleChange('email_mayordomo_desc', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Email Conserjería</label><input type="email" value={form.email_conserje} onChange={(e) => handleChange('email_conserje', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Descripción Conserjería</label><input type="text" value={form.email_conserje_desc} onChange={(e) => handleChange('email_conserje_desc', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </section>

                {/* SECCIÓN 2: MUDANZAS */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600">2. Reglamento de Mudanzas</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Horarios Permitidos</label><input type="text" value={form.moving_hours} onChange={(e) => handleChange('moving_hours', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Valor Mudanza</label><input type="text" value={form.moving_fee} onChange={(e) => handleChange('moving_fee', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">Descripción del Pago</label><input type="text" value={form.moving_fee_desc} onChange={(e) => handleChange('moving_fee_desc', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">Coordinación Previa</label><input type="text" value={form.moving_coordination} onChange={(e) => handleChange('moving_coordination', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Reglas Salida (una por línea)</label><textarea rows={3} value={form.moving_departure} onChange={(e) => handleChange('moving_departure', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Reglas Ingreso (una por línea)</label><textarea rows={3} value={form.moving_arrival} onChange={(e) => handleChange('moving_arrival', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">Enseres Mayores</label><textarea rows={2} value={form.moving_bulky} onChange={(e) => handleChange('moving_bulky', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">Sanciones</label><textarea rows={2} value={form.moving_sanctions} onChange={(e) => handleChange('moving_sanctions', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </section>

                {/* SECCIÓN 3: HORARIOS */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600">3. Horarios de Mayordomía</h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Lunes</label><input type="text" value={form.sched_may_lu} onChange={(e) => handleChange('sched_may_lu', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Martes</label><input type="text" value={form.sched_may_ma} onChange={(e) => handleChange('sched_may_ma', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Miércoles</label><input type="text" value={form.sched_may_mi} onChange={(e) => handleChange('sched_may_mi', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Jueves</label><input type="text" value={form.sched_may_ju} onChange={(e) => handleChange('sched_may_ju', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Viernes</label><input type="text" value={form.sched_may_vi} onChange={(e) => handleChange('sched_may_vi', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Sábado</label><input type="text" value={form.sched_may_sa} onChange={(e) => handleChange('sched_may_sa', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div className="sm:col-span-3"><label className="mb-1 block text-xs font-medium text-gray-700">Horario Colación</label><input type="text" value={form.sched_break} onChange={(e) => handleChange('sched_break', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </section>

                {/* SECCIÓN 4: ADMINISTRACIÓN Y PRESENCIAL */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600">4. Horarios Administración y Presencial</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Día/Título (Admin)</label><input type="text" value={form.sched_admin_title} onChange={(e) => handleChange('sched_admin_title', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Horas (Admin)</label><input type="text" value={form.sched_admin_hours} onChange={(e) => handleChange('sched_admin_hours', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">Descripción (Admin)</label><input type="text" value={form.sched_admin_desc} onChange={(e) => handleChange('sched_admin_desc', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Atención Presencial 1</label><input type="text" value={form.sched_onsite_1} onChange={(e) => handleChange('sched_onsite_1', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                        <div><label className="mb-1 block text-xs font-medium text-gray-700">Atención Presencial 2</label><input type="text" value={form.sched_onsite_2} onChange={(e) => handleChange('sched_onsite_2', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </section>

                {/* SECCIÓN 5: GENERALES */}
                <section className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-primary-600">5. Datos Generales (WhatsApp y Dirección)</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">URL Grupo WhatsApp</label><input type="url" value={form.whatsapp_url} onChange={(e) => handleChange('whatsapp_url', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="https://chat.whatsapp.com/..." /></div>
                        <div className="sm:col-span-2"><label className="mb-1 block text-xs font-medium text-gray-700">Dirección</label><input type="text" value={form.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm" /></div>
                    </div>
                </section>

                <div className="flex items-center justify-between">
                    {data && <p className="text-xs text-gray-400">Última actualización: {new Date(data.updated_at).toLocaleString('es-CL')}</p>}
                    <button onClick={handleSave} disabled={saving} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-60">
                        {saving ? 'Guardando...' : 'Guardar todos los cambios'}
                    </button>
                </div>
            </div>
        </div>
    );
};