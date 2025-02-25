// src/components/common/LoadingScreen.jsx
import React from 'react';
import Logo from './Logo';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-logo">
          <Logo size="large" />
        </div>
        
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        
        <div className="loading-message">
          {message}
        </div>
      </div>
      
      <style jsx>{`
        .loading-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f8fafc;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 400px;
          padding: 40px;
          text-align: center;
        }
        
        .loading-logo {
          margin-bottom: 32px;
        }
        
        .loading-spinner {
          margin-bottom: 24px;
        }
        
        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(99, 102, 241, 0.1);
          border-left-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .loading-message {
          font-size: 18px;
          color: #1e293b;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
