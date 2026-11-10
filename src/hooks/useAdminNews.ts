import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { News } from '../types';

type Payload = Partial<Omit<News, 'id' | 'published_at'>> & {
    published_at?: string;
};

export const useAdminNews = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (payload: Payload) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('news').insert(payload);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    const update = async (id: string, payload: Payload) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('news').update(payload).eq('id', id);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    const remove = async (id: string) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('news').delete().eq('id', id);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    return { create, update, remove, loading, error };
};