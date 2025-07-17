import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = true; // Replace with actual authentication logic

    return isAuthenticated ? <Outlet /> : <Navigate to='/signin' replace />;
}

export default PrivateRoute;