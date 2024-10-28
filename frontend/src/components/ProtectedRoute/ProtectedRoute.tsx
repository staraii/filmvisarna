import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Show warning message when the component mounts if the user is not authenticated
    if (!isAuthenticated) {
      setShowWarning(true);
      // Automatically redirect after a short delay
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      {showWarning && (
        <div style={{ color: 'red', margin: '20px', textAlign: 'center' }}>
          <p>Du måste vara inloggad för att komma åt denna sida.</p>
        </div>
      )}
      <Navigate to="/login" />
    </>
  );
};

export default ProtectedRoute;


