// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/common/Logo';
import '../styles/auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is coming from pricing page or has a plan selected
  const selectedPlan = location.state?.plan || new URLSearchParams(location.search).get('plan');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setIsLoading(true);
    
    try {
      // Attempt registration
      await register(name, email, password);
      
      // Redirect based on selected plan
      if (selectedPlan === 'pro') {
        navigate('/checkout', { state: { plan: 'pro' } });
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
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
          <h1>Create your account</h1>
          <p>{selectedPlan === 'pro' ? 'Sign up for Lalaforms Pro' : 'Start building beautiful forms for free'}</p>
        </div>
        
        {error && (
          <div className="auth-error">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
          </div>
        )}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
              autoComplete="name"
            />
          </div>
          
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8+ characters"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="8+ characters"
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>
          
          <div className="form-group">
            <div className="terms-agreement">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="agree-terms">
                I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 
             selectedPlan === 'pro' ? 'Create account & continue to payment' : 
             'Create your free account'}
          </button>
          
          {selectedPlan === 'pro' && (
            <div className="plan-info">
              <div className="plan-badge">PRO</div>
              <div className="plan-details">
                <h4>Pro Plan</h4>
                <p>$10/month or $99/year (save 18%)</p>
              </div>
            </div>
          )}
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
      
      <div className="auth-image">
        <div className="image-overlay">
          <div className="feature-highlights">
            <h3>With Lalaforms you can:</h3>
            <ul>
              <li>Create beautiful forms without code</li>
              <li>Collect and analyze responses easily</li>
              <li>Integrate with your favorite tools</li>
              <li>Automate your workflows</li>
            </ul>
            
            <div className="stats">
              <div className="stat">
                <div className="stat-value">100k+</div>
                <div className="stat-label">Forms Created</div>
              </div>
              <div className="stat">
                <div className="stat-value">5M+</div>
                <div className="stat-label">Submissions</div>
              </div>
              <div className="stat">
                <div className="stat-value">10k+</div>
                <div className="stat-label">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
