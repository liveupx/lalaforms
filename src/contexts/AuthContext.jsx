import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

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
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                        process.env.REACT_APP_ENABLE_AUTH === 'false';

  useEffect(() => {
    // For development, automatically "authenticate" after a short delay
    if (isDevelopment) {
      const timer = setTimeout(() => {
        const devUser = {
          id: 'dev-user-123',
          name: 'Development User',
          email: 'dev@example.com',
          role: 'admin'
        };
        
        setCurrentUser(devUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        
        // Store in localStorage for persistence
        localStorage.setItem('lalaforms_auth_user', JSON.stringify(devUser));
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      // In production, use Firebase Authentication
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is logged in
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          // Create a normalized user object
          const normalizedUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            role: userDoc.exists() ? userDoc.data().role : 'user'
          };
          
          setCurrentUser(normalizedUser);
          
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
          
          setIsAuthenticated(true);
        } else {
          // User is not logged in
          setCurrentUser(null);
          setUserProfile(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      });
      
      // Cleanup subscription
      return () => unsubscribe();
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
      
      // In production, use Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      // Create normalized user object
      const normalizedUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: userDoc.exists() ? userDoc.data().role : 'user'
      };
      
      return { success: true, user: normalizedUser };
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
      if (isDevelopment) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('lalaforms_auth_user');
        return { success: true };
      }
      
      // In production, use Firebase Authentication
      await signOut(auth);
      return { success: true };
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
      
      // In production, use Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, { displayName: name });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        displayName: name,
        role: 'user',
        createdAt: serverTimestamp(),
        planType: 'free',
        usage: {
          forms: 0,
          submissions: 0,
          lastBillingCycle: serverTimestamp()
        }
      });
      
      // Create normalized user object
      const normalizedUser = {
        id: user.uid,
        name: name,
        email: email,
        role: 'user'
      };
      
      return { success: true, user: normalizedUser };
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    userProfile,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
    isPremium: userProfile?.planType === 'premium' || userProfile?.planType === 'pro'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;