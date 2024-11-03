import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from './../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  firstName: string | null;
  login: (email: string, firstName: string) => void;
  logout: () => void;
  register: (formData: AuthService.FormData) => Promise<void>;
  fetchUserData: () => Promise<void>; // New method to fetch user data
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('userEmail');
  });
  const [firstName, setFirstName] = useState<string | null>(() => {
    return sessionStorage.getItem('firstName');
  });

  const login = (email: string, firstName: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setFirstName(firstName);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('firstName', firstName);
  };

  const fetchUserData = async () => {
    try {
      const userData = await AuthService.getMe(); // Fetch user data
      login(userData.email, userData.firstName); // Store email and firstName in context
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setFirstName(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('firstName');
  };

  const register = async (formData: AuthService.FormData) => {
    try {
      const { email, firstName } = await AuthService.register(formData);
      login(email, firstName);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (userEmail) sessionStorage.setItem('userEmail', userEmail);
    if (firstName) sessionStorage.setItem('firstName', firstName);
  }, [isAuthenticated, userEmail, firstName]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, firstName, login, logout, register, fetchUserData }}>
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
