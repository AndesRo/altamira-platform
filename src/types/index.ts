export interface Administration {
    id: string;
    name: string;
    summary: string;
    full_description: string | null;
    pdf_url: string | null;
    contact_name: string | null;
    order_index: number;
    created_at: string;
}

export interface News {
    id: string;
    title: string;
    content: string;
    image_url: string | null;
    external_url: string | null;
    published_at: string;
}

export interface DocumentItem {
    id: string;
    title: string;
    description: string | null;
    category: string;
    file_url: string;
    cover_image_url: string | null; // 👈 nuevo
    uploaded_at: string;
}

export interface User {
    id: string;
    email: string;
}

// ...tipos existentes...

export interface ContactInfo {
    id: number;
    admin_phone: string;
    admin_email: string;
    admin_hours: string;
    address: string;
    whatsapp_url: string;
    conserjeria_phone: string;
    conserjeria_hours: string;
    emergencies_note: string;
    updated_at: string;
}