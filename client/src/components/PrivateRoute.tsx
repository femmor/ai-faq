import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
    allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { role } = useAuth();

    return allowedRoles.includes(role || '') ? <div className="flex w-full min-h-screen bg-gray-100">
        <Outlet />
    </div> : <Navigate to="/login" replace />;
}

export default PrivateRoute;