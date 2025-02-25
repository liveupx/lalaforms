// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser 
} from '../services/authService';

// Create the auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        // User is not logged in, that's fine
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      setError(err.message || "Failed to login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await registerUser(name, email, password);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (err) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await logoutUser();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message || "Failed to logout");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = async (userData) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be an API call in a real app
      const updatedUser = {
        ...currentUser,
        ...userData
      };
      
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear any auth errors
  const clearError = () => {
    setError(null);
  };
  
  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
