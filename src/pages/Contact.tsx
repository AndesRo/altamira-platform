// src/pages/Contact.tsx
import { ReactNode } from 'react';
import { useContactInfo } from '../hooks/useContactInfo';
import { Loading } from '../components/Loading';

/* ============================================================
   Iconos SVG
   ============================================================ */
const PhoneIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MailIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
    </svg>
);

const ClockIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
);

const MapPinIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
);

interface ContactCardProps {
    icon: ReactNode;
    iconBg: string;
    label: string;
    value: string;
    href?: string;
    action?: string;
}

const ContactCard = ({
    icon,
    iconBg,
    label,
    value,
    href,
    action = 'Contactar',
}: ContactCardProps) => {
    const content = (
        <>
            <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-md ${iconBg}`}
            >
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {label}
                </p>
                <p className="mt-1 break-words text-lg font-bold text-gray-900">
                    {value}
                </p>
                {href && (
                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2">
                        {action}
                        <ArrowRightIcon />
                    </p>
                )}
            </div>
        </>
    );

    const baseClasses =
        'group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition';

    if (href) {
        return (
            <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className={`${baseClasses} hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg`}
            >
                {content}
            </a>
        );
    }

    return <div className={baseClasses}>{content}</div>;
};

/* ============================================================
   Página
   ============================================================ */
export const Contact = () => {
    const { data, loading, error } = useContactInfo();

    if (loading) return <Loading message="Cargando contacto..." />;
    if (error)
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Error al cargar contacto: {error}
            </div>
        );
    if (!data)
        return (
            <div className="rounded-lg bg-amber-50 p-4 text-amber-800">
                La información de contacto aún no ha sido configurada.
            </div>
        );

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Contacto
                </h1>
                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Canales oficiales de comunicación de la comunidad del Edificio
                    Altamira.
                </p>
            </header>

            {/* WhatsApp destacado */}
            {data.whatsapp_url && (
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 p-6 shadow-lg sm:p-8">
                    <div className="pointer-events-none absolute inset-0 opacity-10">
                        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white" />
                        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white" />
                    </div>

                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur">
                                <WhatsAppIcon />
                            </div>
                            <div className="text-white">
                                <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                                    Grupo oficial
                                </span>
                                <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">
                                    WhatsApp comunitario
                                </h2>
                                <p className="mt-1 text-sm text-emerald-50 sm:text-base">
                                    Únete al grupo de vecinos para avisos, coordinación y
                                    emergencias del edificio.
                                </p>
                            </div>
                        </div>

                        <a
                            href={data.whatsapp_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-md transition hover:bg-emerald-50 sm:whitespace-nowrap"
                        >
                            Unirme al grupo
                            <ExternalLinkIcon />
                        </a>
                    </div>
                </section>
            )}

            {/* Tarjetas de contacto */}
            <section>
                <h2 className="mb-4 text-lg font-bold text-gray-900">
                    Contacto Administración
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <ContactCard
                        icon={<PhoneIcon />}
                        iconBg="bg-gradient-to-br from-blue-500 to-blue-700"
                        label="Teléfono"
                        value={data.admin_phone}
                        href={`tel:${data.admin_phone.replace(/\s/g, '')}`}
                        action="Llamar"
                    />
                    <ContactCard
                        icon={<MailIcon />}
                        iconBg="bg-gradient-to-br from-purple-500 to-purple-700"
                        label="Correo"
                        value={data.admin_email}
                        href={`mailto:${data.admin_email}`}
                        action="Enviar correo"
                    />
                    <ContactCard
                        icon={<ClockIcon />}
                        iconBg="bg-gradient-to-br from-amber-500 to-amber-700"
                        label="Horario de atención"
                        value={data.admin_hours}
                    />
                    <ContactCard
                        icon={<MapPinIcon />}
                        iconBg="bg-gradient-to-br from-slate-500 to-slate-700"
                        label="Dirección"
                        value={data.address}
                    />
                </div>
            </section>

            {/* Emergencias */}
            <section>
                <h2 className="mb-4 text-lg font-bold text-gray-900">
                    Contacto de emergencia
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-4 rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md">
                            <ShieldIcon />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                                Conserjería
                            </p>
                            <a
                                href={`tel:${data.conserjeria_phone.replace(/\s/g, '')}`}
                                className="mt-1 block text-lg font-bold text-gray-900 hover:text-red-700"
                            >
                                {data.conserjeria_phone}
                            </a>
                            <p className="mt-1 text-xs text-gray-500">
                                {data.conserjeria_hours}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                            <ShieldIcon />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                                Emergencias
                            </p>
                            <a
                                href="tel:133"
                                className="mt-1 block text-lg font-bold text-gray-900 hover:text-amber-700"
                            >
                                133 · Carabineros
                            </a>
                            <p className="mt-1 text-xs text-gray-500">
                                {data.emergencies_note}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
                <p className="text-sm text-blue-900">
                    💬 <strong></strong>{' '}

                </p>
            </div>
        </div>
    );
};