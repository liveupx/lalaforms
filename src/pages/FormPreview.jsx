// src/pages/FormPreview.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFormById } from '../services/formService';
import { submitForm } from '../services/submissionService';
import RenderForm from '../components/form-renderer/RenderForm';
import LoadingScreen from '../components/common/LoadingScreen';
import ThankYouScreen from '../components/form-renderer/ThankYouScreen';
import '../styles/form-preview.css';

const FormPreview = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formResponses, setFormResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Load form data
  useEffect(() => {
    const loadForm = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const form = await fetchFormById(formId);
        setFormData(form);
        // Initialize form responses
        const initialResponses = {};
        (form.blocks || []).forEach(block => {
          if (block.defaultValue) {
            initialResponses[block.id] = block.defaultValue;
          }
        });
        setFormResponses(initialResponses);
      } catch (err) {
        console.error("Error loading form:", err);
        setError("Failed to load form. It may not exist or has been deleted.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadForm();
  }, [formId]);
  
  // Handle form field change
  const handleFieldChange = (blockId, value) => {
    setFormResponses(prev => ({
      ...prev,
      [blockId]: value
    }));
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (currentStep < formData.blocks.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Final step - handle submission
      handleSubmitForm();
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };
  
  // Jump to specific step
  const handleJumpToStep = (step) => {
    if (step >= 0 && step < formData.blocks.length) {
      setCurrentStep(step);
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submission
  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    
    try {
      // Process responses into a cleaner structure
      const processedResponses = {};
      
      formData.blocks.forEach(block => {
        if (block.id in formResponses) {
          // Use question as key if available, otherwise fallback to id
          const key = block.question || block.id;
          processedResponses[key] = formResponses[block.id];
        }
      });
      
      // Submit form data
      await submitForm(formId, processedResponses);
      
      // Show thank you screen
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if current field is valid
  const isCurrentFieldValid = () => {
    if (!formData || !formData.blocks || formData.blocks.length === 0) {
      return true;
    }
    
    const currentBlock = formData.blocks[currentStep];
    
    // Skip validation for non-input blocks
    if (currentBlock.type === 'statement') {
      return true;
    }
    
    // If field is required, check for a value
    if (currentBlock.required) {
      const value = formResponses[currentBlock.id];
      
      if (value === undefined || value === null || value === '') {
        return false;
      }
      
      // For array values (like multiple select), check if it has items
      if (Array.isArray(value) && value.length === 0) {
        return false;
      }
    }
    
    return true;
  };
  
  // Return to builder
  const handleReturnToBuilder = () => {
    navigate(`/forms/${formId}`);
  };
  
  // Loading state
  if (isLoading) {
    return <LoadingScreen message="Loading form..." />;
  }
  
  // Error state
  if (error) {
    return (
      <div className="form-preview-error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Error Loading Form</h2>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // Check if form exists
  if (!formData) {
    return (
      <div className="form-preview-error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Form Not Found</h2>
          <p>The form you're looking for doesn't exist or has been deleted.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // If in preview mode (accessed from builder)
  const isPreviewMode = window.location.search.includes('preview=true');
  
  // Render submitted screen
  if (isSubmitted) {
    return (
      <ThankYouScreen
        formData={formData}
        onBackToDashboard={() => navigate('/dashboard')}
      />
    );
  }
  
  // Get the design settings
  const designSettings = formData.design || {
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
  
  return (
    <div 
      className="form-preview-page"
      style={{
        backgroundColor: designSettings.colors.background,
        fontFamily: designSettings.font,
        color: designSettings.colors.text,
        backgroundImage: designSettings.backgroundImage ? `url(${designSettings.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for background brightness control */}
      {designSettings.backgroundImage && (
        <div 
          className="background-overlay"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${1 - designSettings.brightness})`
          }}
        ></div>
      )}
      
      {/* Preview mode top bar */}
      {isPreviewMode && (
        <div className="preview-bar">
          <div className="preview-info">
            <span className="preview-icon">👁️</span>
            <span>Preview Mode</span>
          </div>
          <div className="preview-actions">
            <button 
              className="btn btn-primary"
              onClick={handleReturnToBuilder}
            >
              Back to Editor
            </button>
          </div>
        </div>
      )}
      
      <div className="form-preview-container">
        {/* Form header with logo if available */}
        {designSettings.logo && (
          <div className="form-logo">
            <img src={designSettings.logo} alt="Logo" />
          </div>
        )}
        
        {/* Progress bar */}
        {formData.settings?.general?.progressBar !== false && (
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{
                width: `${((currentStep + 1) / formData.blocks.length) * 100}%`,
                backgroundColor: designSettings.colors.primary
              }}
            ></div>
          </div>
        )}
        
        {/* Render current step */}
        <div className="form-content">
          <RenderForm
            block={formData.blocks[currentStep]}
            value={formResponses[formData.blocks[currentStep].id]}
            onChange={(value) => handleFieldChange(formData.blocks[currentStep].id, value)}
            designSettings={designSettings}
          />
          
          {/* Form navigation */}
          <div className="form-navigation">
            {currentStep > 0 && (
              <button 
                className="btn btn-outline btn-prev"
                onClick={handlePrevStep}
                style={{
                  borderColor: designSettings.colors.buttonBackground,
                  color: designSettings.colors.buttonBackground
                }}
              >
                Back
              </button>
            )}
            
            <button 
              className="btn btn-primary btn-next"
              onClick={handleNextStep}
              disabled={!isCurrentFieldValid() || isSubmitting}
              style={{
                backgroundColor: designSettings.colors.buttonBackground,
                color: designSettings.colors.buttonText
              }}
            >
              {isSubmitting ? 'Submitting...' : 
               currentStep < formData.blocks.length - 1 ? 
               (formData.buttonText || 'Next') : 'Submit'}
            </button>
          </div>
          
          {/* Form step indicator */}
          {formData.settings?.general?.showPageNumbers !== false && (
            <div className="step-indicator">
              {currentStep + 1} of {formData.blocks.length}
            </div>
          )}
        </div>
        
        {/* Navigation arrows */}
        {formData.settings?.general?.navigationArrows !== false && (
          <div className="navigation-arrows">
            {currentStep > 0 && (
              <button 
                className="nav-arrow nav-prev"
                onClick={handlePrevStep}
                aria-label="Previous question"
              >
                ↑
              </button>
            )}
            {currentStep < formData.blocks.length - 1 && (
              <button 
                className="nav-arrow nav-next"
                onClick={handleNextStep}
                aria-label="Next question"
                disabled={!isCurrentFieldValid()}
              >
                ↓
              </button>
            )}
          </div>
        )}
        
        {/* Form footer */}
        <div className="form-footer">
          {!formData.settings?.general?.showPoweredBy === false && (
            <div className="powered-by">
              Powered by <a href="/" target="_blank" rel="noopener noreferrer">Lalaforms</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
