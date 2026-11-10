import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DocumentItem } from '../types';

export const useDocuments = () => {
    const [data, setData] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        supabase
            .from('documents')
            .select('*')
            .order('uploaded_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setData(data ?? []);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};