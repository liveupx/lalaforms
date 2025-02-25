// src/components/form-builder/tabs/ShareTab.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ShareTab = ({ formData, isPublished, onPublish }) => {
  const [embedType, setEmbedType] = useState('inline embed');
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [copyEmbedSuccess, setCopyEmbedSuccess] = useState(false);
  const linkInputRef = useRef(null);
  const embedCodeRef = useRef(null);
  
  // Create form URL - in a real app, this would come from the backend
  const formUrl = `https://app.lalaforms.com/forms/${formData.id || 'demo123'}`;
  
  // Generate embed code based on selected type
  const generateEmbedCode = () => {
    switch (embedType) {
      case 'inline embed':
        return `<iframe src="${formUrl}" loading="lazy" width="100%" height="700" frameborder="0" marginheight="0" marginwidth="0"></iframe>`;
      case 'popup embed':
        return `<script src="https://app.lalaforms.com/embed.js" data-form="${formData.id || 'demo123'}" data-type="popup" async></script>
<button data-lalaforms-popup="${formData.id || 'demo123'}">Open Form</button>`;
      case 'full page embed':
        return `<script src="https://app.lalaforms.com/embed.js" data-form="${formData.id || 'demo123'}" data-type="fullpage" async></script>
<a href="#" data-lalaforms-fullpage="${formData.id || 'demo123'}">Open Form</a>`;
      default:
        return `<iframe src="${formUrl}" loading="lazy" width="100%" height="700" frameborder="0" marginheight="0" marginwidth="0"></iframe>`;
    }
  };
  
  // Copy link to clipboard
  const handleCopyLink = () => {
    if (linkInputRef.current) {
      linkInputRef.current.select();
      document.execCommand('copy');
      setCopyLinkSuccess(true);
      
      // Reset copy success message after 3 seconds
      setTimeout(() => {
        setCopyLinkSuccess(false);
      }, 3000);
    }
  };
  
  // Copy embed code to clipboard
  const handleCopyEmbed = () => {
    if (embedCodeRef.current) {
      embedCodeRef.current.select();
      document.execCommand('copy');
      setCopyEmbedSuccess(true);
      
      // Reset copy success message after 3 seconds
      setTimeout(() => {
        setCopyEmbedSuccess(false);
      }, 3000);
    }
  };
  
  return (
    <div className="share-tab">
      <div className="share-container">
        {!isPublished && (
          <div className="publish-alert">
            <div className="publish-alert-icon">ℹ️</div>
            <div className="publish-alert-content">
              <div className="publish-alert-title">You have some unpublished changes.</div>
              <div className="publish-alert-description">
                Make sure your form is published before you share it to the world.
              </div>
            </div>
            <button 
              className="publish-button"
              onClick={onPublish}
            >
              Publish Now →
            </button>
          </div>
        )}
        
        <div className="share-section">
          <h3 className="share-section-title">Copy Link</h3>
          <div className="share-link-container">
            <input
              ref={linkInputRef}
              type="text"
              value={formUrl}
              readOnly
              className="share-link-input"
              onClick={(e) => e.target.select()}
            />
            <button 
              className="copy-link-button"
              onClick={handleCopyLink}
            >
              {copyLinkSuccess ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
          <p className="share-tip">
            Make sure your form is published before you share it to the world.
          </p>
          
          <div className="social-share-buttons">
            <button className="social-button" title="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </button>
            <button className="social-button" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </button>
            <button className="social-button" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </button>
            <button className="social-button" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
            <button className="social-button" title="QR Code">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="share-section">
          <h3 className="share-section-title">Embed in your website as</h3>
          <select 
            className="embed-select"
            value={embedType}
            onChange={(e) => setEmbedType(e.target.value)}
          >
            <option value="inline embed">Inline embed</option>
            <option value="popup embed">Popup embed</option>
            <option value="full page embed">Full page embed</option>
          </select>
          
          <p className="share-tip">
            Works with WordPress, Squarespace, Wix, Shopify, Webflow, Carrd, and all other website builders.
          </p>
          
          <div className="embed-code-container">
            <textarea
              ref={embedCodeRef}
              className="embed-code"
              value={generateEmbedCode()}
              readOnly
              onClick={(e) => e.target.select()}
            />
            <button 
              className="copy-code-button"
              onClick={handleCopyEmbed}
            >
              {copyEmbedSuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <p className="embed-help-text">
            You may change the height according to your need but we recommend it to be at least 600px
          </p>
        </div>
        
        <div className="share-section">
          <div className="custom-domain-section">
            <div className="custom-domain-header">
              <h3 className="custom-domain-title">Custom Domain</h3>
              <span className="pro-badge">PRO</span>
            </div>
            <p>Please buy a PRO plan to add your own custom domain.</p>
          </div>
        </div>
        
        <div className="share-section">
          <p>
            To change form Title, share image or favicon go to{' '}
            <Link to={`/forms/${formData.id}/settings/links`} className="link-settings-link">
              Link Settings
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareTab;
