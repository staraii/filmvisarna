import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role } = useAuth();

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/loggain" />;
  }

  // If it's an admin-only route and the user is not an admin, redirect to another page
  if (adminOnly && role !== 'admin') {
    return <Navigate to="/" />; // Optionally, you can create an Unauthorized page
  }

  // If user is authenticated and either the route is not admin-only, or the user is an admin, render children
  return <>{children}</>;
};

export default ProtectedRoute;







