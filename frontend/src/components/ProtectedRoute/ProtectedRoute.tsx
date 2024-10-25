import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;