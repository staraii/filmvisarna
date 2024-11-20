import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from './../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  firstName: string | null;
  login: (email: string, firstName: string) => void;
  logout: () => void;
  register: (formData: AuthService.FormData) => Promise<void>;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('userEmail');
  });
  const [firstName, setFirstName] = useState<string | null>(() => {
    return localStorage.getItem('firstName');
  });

  const login = async (email: string, firstName: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setFirstName(firstName);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('firstName', firstName);
  };

  const fetchUserData = async () => {
  try {
    const userData = await AuthService.getMe(); // Fetch user data
    setUserEmail(userData.email); // Update state without calling login
    setFirstName(userData.firstName);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    setIsAuthenticated(false); // Optionally log out user on failure
  }
};

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setFirstName(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('firstName');
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
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      if (userEmail) localStorage.setItem('userEmail', userEmail);
      if (firstName) localStorage.setItem('firstName', firstName);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('firstName');
    }
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
