// src/hooks/useContactInfo.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContactInfo } from '../types';

export const useContactInfo = () => {
    const [data, setData] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        supabase
            .from('contact_info')
            .select('*')
            .eq('id', 1)
            .maybeSingle()
            .then(({ data, error }) => {
                if (error) setError(error.message);
                else setData(data);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};