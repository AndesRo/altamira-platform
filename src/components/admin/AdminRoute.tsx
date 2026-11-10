import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loading } from '../Loading';

interface AdminRouteProps {
    children: ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    const { isAdmin, loading } = useAuth();

    if (loading) return <Loading message="Verificando permisos..." />;
    if (!isAdmin) return <Navigate to="/" replace />;

    return <>{children}</>;
};