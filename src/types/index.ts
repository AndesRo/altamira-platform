export interface ContactInfo {
    id: number;
    // Datos generales existentes
    admin_phone: string;
    admin_email: string;
    admin_hours: string;
    address: string;
    whatsapp_url: string;
    conserjeria_phone: string;
    conserjeria_hours: string;
    emergencies_note: string;

    // Nuevos datos: Mudanzas
    moving_hours: string;
    moving_fee: string;
    moving_fee_desc: string;
    moving_coordination: string;
    moving_departure: string;
    moving_arrival: string;
    moving_bulky: string;
    moving_sanctions: string;

    // Nuevos datos: Contactos específicos
    email_admin: string;
    email_admin_desc: string;
    email_mayordomo: string;
    email_mayordomo_desc: string;
    email_conserje: string;
    email_conserje_desc: string;

    // Nuevos datos: Horarios
    sched_may_lu: string;
    sched_may_ma: string;
    sched_may_mi: string;
    sched_may_ju: string;
    sched_may_vi: string;
    sched_may_sa: string;
    sched_break: string;
    sched_admin_title: string;
    sched_admin_hours: string;
    sched_admin_desc: string;
    sched_onsite_1: string;
    sched_onsite_2: string;

    updated_at: string;
}