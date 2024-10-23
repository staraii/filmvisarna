import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the AuthContext with default undefined values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap around your app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initialize state with sessionStorage value if it exists
    const storedAuthState = sessionStorage.getItem('isAuthenticated');
    return storedAuthState === 'true'; // Convert string to boolean
  });

  // Handle login and logout logic
  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true'); // Store in sessionStorage
    console.log("User logged in:", true); // Log login action
};

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated'); // Clear from sessionStorage
    // Optionally, clear any session tokens or data here
  };

  // Side effect to store the updated auth state in sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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

