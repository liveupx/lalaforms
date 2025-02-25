// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/common/Logo';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const redirectPath = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setIsLoading(true);
    
    try {
      // Attempt login
      await login(email, password);
      
      // On success, redirect to intended destination
      navigate(redirectPath);
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Demo login with pre-filled credentials
  const handleDemoLogin = async (e) => {
    e.preventDefault();
    
    setEmail('demo@lalaforms.com');
    setPassword('password123');
    
    setIsLoading(true);
    
    try {
      await login('demo@lalaforms.com', 'password123');
      navigate(redirectPath);
    } catch (err) {
      setError(err.message || 'Failed to log in with demo account.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <Logo />
          </div>
          <h1>Welcome back</h1>
          <p>Log in to your Lalaforms account</p>
        </div>
        
        {error && (
          <div className="auth-error">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          
          <div className="form-group">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in to your account'}
          </button>
          
          <div className="auth-divider">
            <span>or</span>
          </div>
          
          <button 
            type="button" 
            className="btn btn-outline btn-block btn-demo"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Try Lalaforms with a demo account
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
      
      <div className="auth-image">
        <div className="image-overlay">
          <div className="testimonial">
            <p>"Lalaforms has revolutionized how we collect data from our clients. The intuitive interface and powerful features have saved us countless hours."</p>
            <div className="testimonial-author">
              <div className="author-avatar">JM</div>
              <div className="author-info">
                <h4>Jessica Miller</h4>
                <p>Marketing Director, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
