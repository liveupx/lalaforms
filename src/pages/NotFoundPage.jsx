// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-logo">
          <Logo />
        </div>
        
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
        </div>
        
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link to="/dashboard" className="btn btn-outline">
            Go to Dashboard
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .not-found-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          background-color: var(--light);
        }
        
        .not-found-container {
          max-width: 500px;
          text-align: center;
        }
        
        .not-found-logo {
          margin-bottom: 48px;
        }
        
        .not-found-content {
          margin-bottom: 32px;
        }
        
        .not-found-content h1 {
          font-size: 80px;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 16px;
        }
        
        .not-found-content h2 {
          font-size: 28px;
          margin-bottom: 16px;
          color: var(--dark);
        }
        
        .not-found-content p {
          color: var(--gray);
          font-size: 16px;
        }
        
        .not-found-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        
        @media (max-width: 480px) {
          .not-found-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;