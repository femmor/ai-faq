import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
    allowedRoles: string;
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { role } = useAuth();

    return allowedRoles.includes(role || '') ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;