import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Administration } from '../types';

export const useAdministrations = () => {
    const [data, setData] = useState<Administration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        supabase
            .from('administrations')
            .select('*')
            .order('order_index', { ascending: true })
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setData(data ?? []);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};