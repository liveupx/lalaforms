import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                        process.env.REACT_APP_ENABLE_AUTH === 'false';

  useEffect(() => {
    // For development, automatically "authenticate" after a short delay
    if (isDevelopment) {
      const timer = setTimeout(() => {
        setCurrentUser({
          id: 'dev-user-123',
          name: 'Development User',
          email: 'dev@example.com',
          role: 'admin'
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        
        // Store in localStorage for persistence
        localStorage.setItem('lalaforms_auth_user', JSON.stringify({
          id: 'dev-user-123',
          name: 'Development User',
          email: 'dev@example.com',
          role: 'admin'
        }));
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      // In production, check if user is already logged in
      const storedUser = localStorage.getItem('lalaforms_auth_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, [isDevelopment]);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // For development, just simulate a successful login
      if (isDevelopment) {
        const user = {
          id: 'dev-user-123',
          name: 'Development User',
          email: email || 'dev@example.com',
          role: 'admin'
        };
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('lalaforms_auth_user', JSON.stringify(user));
        return { success: true, user };
      }
      
      // In production, implement actual login logic
      // const response = await authService.login(email, password);
      // setCurrentUser(response.user);
      // setIsAuthenticated(true);
      // localStorage.setItem('lalaforms_auth_user', JSON.stringify(response.user));
      // return response;
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // For development, just clear the state
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('lalaforms_auth_user');
      return { success: true };
      
      // In production, implement actual logout logic
      // await authService.logout();
    } catch (error) {
      return { success: false, error: error.message || 'Logout failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    setIsLoading(true);
    
    try {
      // For development, just simulate a successful signup
      if (isDevelopment) {
        const user = {
          id: 'dev-user-' + Date.now(),
          name: name,
          email: email,
          role: 'user'
        };
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('lalaforms_auth_user', JSON.stringify(user));
        return { success: true, user };
      }
      
      // In production, implement actual signup logic
      // const response = await authService.signup(name, email, password);
      // setCurrentUser(response.user);
      // setIsAuthenticated(true);
      // localStorage.setItem('lalaforms_auth_user', JSON.stringify(response.user));
      // return response;
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;