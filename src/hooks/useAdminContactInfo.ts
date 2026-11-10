// src/hooks/useAdminContactInfo.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContactInfo } from '../types';

type Payload = Partial<Omit<ContactInfo, 'id' | 'updated_at'>>;

export const useAdminContactInfo = () => {
    const [data, setData] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_info')
            .select('*')
            .eq('id', 1)
            .maybeSingle();
        if (error) setError(error.message);
        else setData(data);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const update = async (payload: Payload) => {
        setSaving(true);
        setError(null);
        const { error } = await supabase
            .from('contact_info')
            .update({ ...payload, updated_at: new Date().toISOString() })
            .eq('id', 1);
        setSaving(false);
        if (error) {
            setError(error.message);
            return { error: error.message };
        }
        await load();
        return { error: null };
    };

    return { data, loading, saving, error, update, reload: load };
};