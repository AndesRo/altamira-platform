import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { News } from '../types';

export const useNews = () => {
    const [data, setData] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        supabase
            .from('news')
            .select('*')
            .order('published_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setData(data ?? []);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};

export const useNewsById = (id: string | undefined) => {
    const [data, setData] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        supabase
            .from('news')
            .select('*')
            .eq('id', id)
            .single()
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setData(data);
                setLoading(false);
            });
    }, [id]);

    return { data, loading, error };
};