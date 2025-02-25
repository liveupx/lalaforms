// src/components/form-renderer/ThankYouScreen.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouScreen = ({ formData, onBackToDashboard }) => {
  // Get design settings from form data
  const designSettings = formData?.design || {
    theme: 'default',
    colors: {
      background: '#ffffff',
      primary: '#6366f1',
      text: '#1e293b',
      questionText: '#1e293b',
      answerText: '#64748b',
      buttonBackground: '#6366f1',
      buttonText: '#ffffff'
    },
    font: 'Inter',
    fontSize: 'medium',
    backgroundImage: null,
    brightness: 1,
    logo: null,
    roundCorners: true
  };
  
  // Get custom thank you message if Pro user, otherwise use default
  const thankYouTitle = formData?.settings?.thankYou?.title || 'Thank You!';
  const thankYouMessage = formData?.settings?.thankYou?.message || 
    'Your response has been successfully submitted. We appreciate your time and feedback.';
  const showBackToFormButton = formData?.settings?.thankYou?.showBackToFormButton !== false;
  const backToFormText = formData?.settings?.thankYou?.backToFormText || 'Submit another response';
  const redirectUrl = formData?.settings?.thankYou?.redirectUrl || null;
  const redirectDelay = formData?.settings?.thankYou?.redirectDelay || 0;
  const isPro = formData?.createdBy?.isPro || false; // Check if form creator is Pro user
  
  // Handle automatic redirect if configured
  React.useEffect(() => {
    if (redirectUrl && redirectDelay > 0) {
      const redirectTimer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, redirectDelay * 1000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [redirectUrl, redirectDelay]);
  
  return (
    <div 
      className="thank-you-page"
      style={{
        backgroundColor: designSettings.colors.background,
        fontFamily: designSettings.font,
        color: designSettings.colors.text,
        backgroundImage: designSettings.backgroundImage ? `url(${designSettings.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      {/* Overlay for background brightness control */}
      {designSettings.backgroundImage && (
        <div 
          className="background-overlay"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${1 - designSettings.brightness})`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}
        ></div>
      )}
      
      <div 
        className="thank-you-container"
        style={{
          backgroundColor: 'white',
          borderRadius: designSettings.roundCorners ? '12px' : '0',
          padding: '48px',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Form logo if available */}
        {designSettings.logo && (
          <div 
            className="thank-you-logo"
            style={{
              marginBottom: '24px'
            }}
          >
            <img 
              src={designSettings.logo} 
              alt="Logo" 
              style={{
                maxHeight: '60px',
                maxWidth: '180px'
              }}
            />
          </div>
        )}
        
        {/* Success icon */}
        <div 
          className="success-icon"
          style={{
            fontSize: '64px',
            marginBottom: '24px',
            color: designSettings.colors.primary
          }}
        >
          ✓
        </div>
        
        <h1 
          className="thank-you-title"
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '16px',
            color: designSettings.colors.questionText
          }}
        >
          {thankYouTitle}
        </h1>
        
        <p 
          className="thank-you-message"
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '32px',
            color: designSettings.colors.answerText
          }}
        >
          {thankYouMessage}
        </p>
        
        <div className="thank-you-actions">
          {showBackToFormButton && (
            <button 
              className="btn btn-outline"
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                borderRadius: designSettings.roundCorners ? '8px' : '0',
                marginRight: '16px',
                border: `1px solid ${designSettings.colors.buttonBackground}`,
                color: designSettings.colors.buttonBackground,
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {backToFormText}
            </button>
          )}
          
          {/* Only show dashboard button if accessed via preview */}
          {onBackToDashboard && (
            <button 
              className="btn btn-primary"
              onClick={onBackToDashboard}
              style={{
                padding: '12px 24px',
                borderRadius: designSettings.roundCorners ? '8px' : '0',
                backgroundColor: designSettings.colors.buttonBackground,
                color: designSettings.colors.buttonText,
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Back to Dashboard
            </button>
          )}
        </div>
        
        {/* Footer */}
        <div 
          className="thank-you-footer"
          style={{
            marginTop: '48px',
            fontSize: '14px',
            color: '#9ca3af'
          }}
        >
          {!isPro && (
            <div className="powered-by">
              Powered by <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: designSettings.colors.primary,
                  textDecoration: 'none'
                }}
              >
                Lalaforms
              </a>
            </div>
          )}
          
          {redirectUrl && redirectDelay > 0 && (
            <div 
              className="redirect-notice"
              style={{
                marginTop: '16px',
                fontSize: '14px',
                color: '#9ca3af'
              }}
            >
              You will be redirected in {redirectDelay} seconds...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
