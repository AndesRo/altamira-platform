import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Administration } from '../types';

type Payload = Partial<Omit<Administration, 'id' | 'created_at'>>;

export const useAdminAdministrations = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (payload: Payload) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('administrations').insert(payload);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    const update = async (id: string, payload: Payload) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase
            .from('administrations')
            .update(payload)
            .eq('id', id);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    const remove = async (id: string) => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.from('administrations').delete().eq('id', id);
        setLoading(false);
        if (error) setError(error.message);
        return { error: error?.message ?? null };
    };

    return { create, update, remove, loading, error };
};