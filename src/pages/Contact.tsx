// src/pages/Contact.tsx
import { useContactInfo } from '../hooks/useContactInfo';
import { Loading } from '../components/Loading';

// ... (Mantén los iconos SVG: TruckIcon, MailIcon, ClockIcon, MapPinIcon, WhatsAppIcon, AlertIcon) ...
// [Copia los iconos de la respuesta anterior]

const TruckIcon = () => (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a2 2 0 0 1 2 2v6h-2a2 2 0 1 1-4 0H7a2 2 0 1 1-4 0H1v-4a2 2 0 0 1 2-2zm11 0V6a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .94.75l1.7 6.25H14z" /></svg>);
const MailIcon = () => (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" /></svg>);
const ClockIcon = () => (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>);
const MapPinIcon = () => (<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const WhatsAppIcon = () => (<svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" /></svg>);
const AlertIcon = () => (<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>);

export const Contact = () => {
    const { data, loading, error } = useContactInfo();

    if (loading) return <Loading message="Cargando información..." />;
    if (error || !data) return <div className="p-4 text-red-700">Error al cargar información.</div>;

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">

                {/* 1. MUDANZAS Y MOVIMIENTO DE ENSERES */}
                <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 rounded-t-2xl bg-blue-900 px-5 py-4 text-white">
                        <TruckIcon />
                        <h2 className="text-lg font-bold">Mudanzas y Movimiento de Enseres</h2>
                    </div>

                    <div className="p-5 space-y-4 text-sm text-gray-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className="font-semibold text-gray-900">Horarios Permitidos</p>
                                <p className="mt-1">{data.moving_hours}</p>
                            </div>
                            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                <p className="font-semibold text-amber-900">Pago por Mudanza</p>
                                <p className="mt-1 text-lg font-bold text-amber-600">{data.moving_fee}</p>
                                <p className="mt-1 text-xs text-amber-800">{data.moving_fee_desc}</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                            <p className="font-semibold text-blue-900">Coordinación Previa</p>
                            <p className="mt-1 text-blue-800">{data.moving_coordination}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-xl border border-gray-200 p-4">
                                <p className="font-semibold text-gray-900">Mudanza de Salida</p>
                                <p className="text-xs text-gray-500 mb-2">(Retiro de Bienes)</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    {data.moving_departure.split('\n').map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 p-4">
                                <p className="font-semibold text-gray-900">Mudanza de Ingreso</p>
                                <p className="text-xs text-gray-500 mb-2">(Nuevo Residente)</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    {data.moving_arrival.split('\n').map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
                            <p className="font-semibold text-gray-900">Movimiento de Enseres Mayores</p>
                            <p className="mt-1 text-xs">{data.moving_bulky}</p>
                        </div>

                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3">
                            <div className="text-red-600 flex-shrink-0"><AlertIcon /></div>
                            <div>
                                <p className="font-semibold text-red-900">Sanciones</p>
                                <p className="mt-1 text-xs text-red-800">{data.moving_sanctions}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* COLUMNA DERECHA */}
                <div className="space-y-6">

                    {/* 2. CONTACTOS ALTAMIRA */}
                    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 rounded-t-2xl bg-blue-900 px-5 py-4 text-white">
                            <MailIcon />
                            <h2 className="text-lg font-bold">Contactos Altamira</h2>
                        </div>

                        <div className="divide-y divide-gray-100 p-2">
                            <div className="p-4 flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900">Administración</p>
                                    <a href={`mailto:${data.email_admin}`} className="text-sm font-medium text-primary-600 hover:underline break-all">
                                        {data.email_admin}
                                    </a>
                                    <p className="mt-1 text-xs text-gray-500">{data.email_admin_desc}</p>
                                </div>
                            </div>

                            <div className="p-4 flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900">Mayordomía</p>
                                    <a href={`mailto:${data.email_mayordomo}`} className="text-sm font-medium text-primary-600 hover:underline break-all">
                                        {data.email_mayordomo}
                                    </a>
                                    <p className="mt-1 text-xs text-gray-500">{data.email_mayordomo_desc}</p>
                                </div>
                            </div>

                            <div className="p-4 flex gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900">Conserjería</p>
                                    <a href={`mailto:${data.email_conserje}`} className="text-sm font-medium text-primary-600 hover:underline break-all">
                                        {data.email_conserje}
                                    </a>
                                    <p className="mt-1 text-xs text-gray-500">{data.email_conserje_desc}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. HORARIOS */}
                    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 rounded-t-2xl bg-blue-900 px-5 py-4 text-white">
                            <ClockIcon />
                            <h2 className="text-lg font-bold">Horarios de Atención</h2>
                        </div>

                        <div className="p-5 space-y-5">
                            <div>
                                <p className="font-bold text-gray-900 mb-2">Mayordomía (Horario de Trabajo)</p>
                                <div className="overflow-hidden rounded-lg border border-gray-200 text-sm">
                                    <table className="w-full text-left">
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-gray-50"><td className="px-3 py-2 font-medium">Lunes</td><td className="px-3 py-2">{data.sched_may_lu}</td></tr>
                                            <tr><td className="px-3 py-2 font-medium">Martes</td><td className="px-3 py-2">{data.sched_may_ma}</td></tr>
                                            <tr className="bg-gray-50"><td className="px-3 py-2 font-medium">Miércoles</td><td className="px-3 py-2">{data.sched_may_mi}</td></tr>
                                            <tr><td className="px-3 py-2 font-medium">Jueves</td><td className="px-3 py-2">{data.sched_may_ju}</td></tr>
                                            <tr className="bg-gray-50"><td className="px-3 py-2 font-medium">Viernes</td><td className="px-3 py-2">{data.sched_may_vi}</td></tr>
                                            <tr><td className="px-3 py-2 font-medium">Sábado</td><td className="px-3 py-2">{data.sched_may_sa}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                    <span className="font-semibold">Colación:</span> {data.sched_break}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                                    <p className="font-bold text-blue-900">Administración</p>
                                    <p className="text-xs text-blue-800 mb-2">Horario de Atención</p>
                                    <p className="font-semibold text-blue-900">{data.sched_admin_title}</p>
                                    <p className="text-sm text-blue-800">{data.sched_admin_hours}</p>
                                    <p className="mt-2 text-xs text-blue-700">{data.sched_admin_desc}</p>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <p className="font-bold text-gray-900">Atención Presencial</p>
                                    <p className="text-xs text-gray-500 mb-2">Para Residentes</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• {data.sched_onsite_1}</li>
                                        <li>• {data.sched_onsite_2}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* 4. WHATSAPP Y DIRECCIÓN */}
            <section className="grid gap-6 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 p-6 shadow-lg flex items-center justify-between">
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white" />
                    </div>
                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur">
                            <WhatsAppIcon />
                        </div>
                        <div className="text-white">
                            <p className="text-lg font-bold">Grupo de WhatsApp Comunitario</p>
                            <p className="text-xs text-emerald-50">Únete para avisos y coordinación.</p>
                        </div>
                    </div>
                    <a
                        href={data.whatsapp_url}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-10 rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-md transition hover:bg-emerald-50"
                    >
                        Unirme
                    </a>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                        <MapPinIcon />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Dirección
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                            {data.address}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};