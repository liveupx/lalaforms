// src/pages/FormBuilder.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BuilderHeader from '../components/form-builder/BuilderHeader';
import BuilderTabs from '../components/form-builder/BuilderTabs';
import BuildTab from '../components/form-builder/tabs/BuildTab';
import DesignTab from '../components/form-builder/tabs/DesignTab';
import IntegrateTab from '../components/form-builder/tabs/IntegrateTab';
import SettingsTab from '../components/form-builder/tabs/SettingsTab';
import ShareTab from '../components/form-builder/tabs/ShareTab';
import ResultsTab from '../components/form-builder/tabs/ResultsTab';
import LoadingScreen from '../components/common/LoadingScreen';
import useFormData from '../hooks/useFormData';
import { saveDraft } from '../services/formService';
import '../styles/form-builder.css';

const FormBuilder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('build');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const saveTimeoutRef = useRef(null);
  
  // Custom hook to manage form data
  const { 
    formData, 
    setFormData, 
    isLoading, 
    error, 
    updateFormField,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    duplicateBlock
  } = useFormData(formId);
  
  // Auto-save functionality
  useEffect(() => {
    if (!formData || isLoading) return;
    
    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set hasUnsavedChanges to true when changes are made
    setHasUnsavedChanges(true);
    
    // Set a new timeout for auto-saving
    saveTimeoutRef.current = setTimeout(() => {
      handleSaveForm();
    }, 2000); // Auto-save after 2 seconds of inactivity
    
    // Clean up on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData]);
  
  // Save form function
  const handleSaveForm = async () => {
    if (!formData || isSaving) return;
    
    setIsSaving(true);
    try {
      // This would be an API call in a real application
      const savedForm = await saveDraft(formData);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving form:", error);
      // Would show an error toast in a real app
    } finally {
      setIsSaving(false);
    }
  };
  
  // Publish form function
  const handlePublishForm = async () => {
    // First save any unsaved changes
    if (hasUnsavedChanges) {
      await handleSaveForm();
    }
    
    try {
      // This would be an API call in a real application
      // For now, just set the published state
      setIsPublished(true);
      // Would show a success toast in a real app
    } catch (error) {
      console.error("Error publishing form:", error);
      // Would show an error toast in a real app
    }
  };
  
  // Preview form function
  const handlePreviewForm = () => {
    // Open form preview in a new tab
    window.open(`/preview/${formId}`, '_blank');
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    // Save any unsaved changes before switching tabs
    if (hasUnsavedChanges) {
      handleSaveForm();
    }
    setActiveTab(tab);
  };
  
  // Return to dashboard
  const handleBackToDashboard = () => {
    // Check for unsaved changes first
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };
  
  if (isLoading) {
    return <LoadingScreen message="Loading your form..." />;
  }
  
  if (error) {
    return (
      <div className="error-state">
        <h2>Error Loading Form</h2>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="form-builder">
      {/* Builder Header */}
      <BuilderHeader 
        formTitle={formData?.title || 'Untitled Form'}
        updateFormTitle={(title) => updateFormField('title', title)}
        isSaving={isSaving}
        lastSaved={lastSaved}
        isPublished={isPublished}
        onPublish={handlePublishForm}
        onPreview={handlePreviewForm}
        onBack={handleBackToDashboard}
        hasUnsavedChanges={hasUnsavedChanges}
      />
      
      {/* Builder Tabs */}
      <BuilderTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      
      {/* Tab Content */}
      <div className="builder-content">
        {activeTab === 'build' && (
          <BuildTab 
            formData={formData}
            addBlock={addBlock}
            updateBlock={updateBlock}
            removeBlock={removeBlock}
            moveBlock={moveBlock}
            duplicateBlock={duplicateBlock}
          />
        )}
        
        {activeTab === 'design' && (
          <DesignTab 
            formData={formData}
            updateFormField={updateFormField}
          />
        )}
        
        {activeTab === 'integrate' && (
          <IntegrateTab 
            formData={formData}
            updateFormField={updateFormField}
          />
        )}
        
        {activeTab === 'settings' && (
          <SettingsTab 
            formData={formData}
            updateFormField={updateFormField}
          />
        )}
        
        {activeTab === 'share' && (
          <ShareTab 
            formData={formData}
            isPublished={isPublished}
            onPublish={handlePublishForm}
          />
        )}
        
        {activeTab === 'results' && (
          <ResultsTab 
            formId={formId}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
