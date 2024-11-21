import React, { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from './../services/authService';


// Define a type for user data returned from the backend

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  firstName: string | null;
  login: (email: string, firstName: string, role: string) => void;
  logout: () => void;
  role: string | null;
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
   const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem('role');
  });

const login = async (email: string, firstName: string, role: string) => {
  setIsAuthenticated(true);
  setUserEmail(email);
  setFirstName(firstName);
  setRole(role); // Ensure role is set
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userEmail', email);
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('role', role);
};

const fetchUserData = async () => {
  try {
    const userData = await AuthService.getMe();
    setUserEmail(userData.email);
    setFirstName(userData.firstName);
    setRole(userData.role || 'user'); // Set default role if missing
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    setIsAuthenticated(false); // Optional: this could also be handled differently
  }
};

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setFirstName(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('firstName');
    localStorage.removeItem('role');
  };

 const register = async (formData: AuthService.FormData) => {
  try {
    const { email, firstName } = await AuthService.register(formData);
    const role = 'user'; // Set the default role manually for now
    login(email, firstName, role);
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
    if (role) localStorage.setItem('role', role);
  } else {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('firstName');
    localStorage.removeItem('role');
  }
}, [isAuthenticated, userEmail, firstName, role]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, firstName,role, login, logout, register, fetchUserData }}>
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
