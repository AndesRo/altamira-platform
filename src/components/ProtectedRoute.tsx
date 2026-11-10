// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loading } from './Loading';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { session, loading } = useAuth();

    if (loading) return <Loading message="Verificando sesión..." />;
    if (!session) return <Navigate to="/login" replace />;

    return <>{children}</>;
};