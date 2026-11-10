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
    published_at: string;
}

export interface DocumentItem {
    id: string;
    title: string;
    description: string | null;
    category: string;
    file_url: string;
    uploaded_at: string;
}

export interface User {
    id: string;
    email: string;
}