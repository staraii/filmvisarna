import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from './../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  register: (formData: AuthService.FormData) => Promise<void>;
  getUserEmail: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = sessionStorage.getItem('isAuthenticated');
    return storedAuthState === 'true';
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('userEmail');
  });

const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userEmail', email);
};

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userEmail');
  };

  const register = async (formData: AuthService.FormData) => {
    try {
      console.log('Attempting to register with data:', formData);
      await AuthService.register(formData);
      login(formData.email);
      console.log("Registration successful, user is logged in.");
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const getUserEmail = () => userEmail;

 useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (userEmail) {
        sessionStorage.setItem('userEmail', userEmail);
    } else {
        sessionStorage.removeItem('userEmail');
    }
}, [isAuthenticated, userEmail]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, register, getUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};