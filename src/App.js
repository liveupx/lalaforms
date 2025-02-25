// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/FormBuilder';
import FormPreview from './pages/FormPreview';
import NotFoundPage from './pages/NotFoundPage';

// Components
import LoadingScreen from './components/common/LoadingScreen';

// Styles
import './styles/global.css';
import './styles/app-layout.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/form-builder.css';
import './styles/form-preview.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/forms/new" element={
            <ProtectedRoute>
              <FormBuilder />
            </ProtectedRoute>
          } />
          
          <Route path="/forms/:formId" element={
            <ProtectedRoute>
              <FormBuilder />
            </ProtectedRoute>
          } />
          
          <Route path="/preview/:formId" element={<FormPreview />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;