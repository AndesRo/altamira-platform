import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { DocumentItem } from '../types';

type Payload = Partial<Omit<DocumentItem, 'id' | 'uploaded_at'>>;

export const useAdminDocuments = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (payload: Payload) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('documents').insert(payload);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    const update = async (id: string, payload: Payload) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('documents').update(payload).eq('id', id);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    const remove = async (id: string) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('documents').delete().eq('id', id);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    return { create, update, remove, loading, error };
};