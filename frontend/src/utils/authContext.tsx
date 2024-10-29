import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from './../services/authService';

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  register: (formData: AuthService.FormData) => Promise<void>;
}

// Create the AuthContext with default undefined values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap around your app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = sessionStorage.getItem('isAuthenticated');
    return storedAuthState === 'true'; // Convert string to boolean
  });

  // Handle login and logout logic
  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
    console.log("User logged in:", true); // Log login action
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated'); // Clear from sessionStorage
  };

  const register = async (formData: AuthService.FormData) => {
    try {
      console.log('Attempting to register with data:', formData);
      await AuthService.register(formData);

      // If registration was successful, automatically log in
      login();
      console.log("Registration successful, user is logged in.");

    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  // Side effect to store the updated auth state in sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


