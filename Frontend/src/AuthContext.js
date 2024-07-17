// AuthContext.js

// Import necessary modules
import React, { createContext, useContext, useState } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide authentication context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
  };

  return (
    // Provide the authentication context to child components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
