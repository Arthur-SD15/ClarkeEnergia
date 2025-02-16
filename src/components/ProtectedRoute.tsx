import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
  isLoginRoute?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isLoginRoute }) => {
    const token = localStorage.getItem('token');

    if (isLoginRoute && token) {
        return <Navigate to="/home" />;
    }

    if (!isLoginRoute && !token) {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
