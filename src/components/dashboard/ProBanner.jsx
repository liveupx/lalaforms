// src/components/dashboard/ProBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProBanner = ({ hasDiscount = false, onClose }) => {
  return (
    <div className="pro-banner">
      <div className="pro-banner-content">
        <div className="pro-banner-icon">👑</div>
        <div className="pro-banner-text">
          {hasDiscount ? (
            <span className="pro-discount">You've got a discount! 👋</span>
          ) : (
            <span className="pro-intro">Upgrade to Pro and unlock all features!</span>
          )}
        </div>
      </div>
      
      <div className="pro-banner-actions">
        <Link to="/upgrade" className="btn-pro">
          {hasDiscount ? 'Buy PRO' : 'Upgrade Now'}
        </Link>
        
        <button 
          className="pro-banner-close"
          onClick={onClose}
          aria-label="Close pro banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ProBanner;
