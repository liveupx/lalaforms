// src/components/form-builder/tabs/SettingsTab.jsx
import React, { useState } from 'react';

const SettingsTab = ({ formData, updateFormField }) => {
  const [activeSection, setActiveSection] = useState('general');
  
  // Initialize settings with defaults if not set
  const settings = formData.settings || {
    general: {
      formTitle: formData.title || 'Untitled Form',
      formDescription: '',
      submitButtonText: 'Submit',
      progressBar: true,
      showPageNumbers: true,
      navigationArrows: true,
      enableReCaptcha: true,
      showPoweredBy: true
    },
    email: {
      notifyOnSubmission: true,
      replyToEnabled: false,
      replyToField: '',
      emailSubject: `New submission for ${formData.title || 'your form'}`,
      emailTemplate: 'default',
      autoResponder: {
        enabled: false,
        subject: 'Thank you for your submission',
        message: 'Thank you for your submission. We will get back to you soon.'
      }
    },
    access: {
      passwordProtection: {
        enabled: false,
        password: ''
      },
      limitSubmissions: {
        enabled: false,
        limit: 100
      },
      closingDate: {
        enabled: false,
        date: null
      }
    },
    hiddenFields: [],
    linkSettings: {
      shareImage: null,
      favicon: null,
      seoTitle: formData.title || 'Untitled Form',
      seoDescription: ''
    },
    language: 'en'
  };
  
  // Update settings
  const handleSettingsUpdate = (section, field, value) => {
    const updatedSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    };
    
    updateFormField('settings', updatedSettings);
  };
  
  // Update nested settings
  const handleNestedSettingsUpdate = (section, nestedKey, field, value) => {
    const updatedSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [nestedKey]: {
          ...settings[section][nestedKey],
          [field]: value
        }
      }
    };
    
    updateFormField('settings', updatedSettings);
  };
  
  // Render different settings sections
  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <GeneralSettings 
            settings={settings.general} 
            onUpdate={(field, value) => handleSettingsUpdate('general', field, value)} 
          />
        );
        
      case 'email':
        return (
          <EmailSettings 
            settings={settings.email} 
            onUpdate={(field, value) => handleSettingsUpdate('email', field, value)}
            onNestedUpdate={(nestedKey, field, value) => handleNestedSettingsUpdate('email', nestedKey, field, value)}
          />
        );
        
      case 'access':
        return (
          <AccessSettings 
            settings={settings.access} 
            onUpdate={(field, value) => handleSettingsUpdate('access', field, value)}
            onNestedUpdate={(nestedKey, field, value) => handleNestedSettingsUpdate('access', nestedKey, field, value)}
          />
        );
        
      case 'hiddenFields':
        return (
          <HiddenFieldsSettings 
            settings={settings.hiddenFields} 
            onUpdate={(hiddenFields) => updateFormField('settings', { ...settings, hiddenFields })}
          />
        );
        
      case 'linkSettings':
        return (
          <LinkSettings 
            settings={settings.linkSettings} 
            onUpdate={(field, value) => handleSettingsUpdate('linkSettings', field, value)} 
          />
        );
        
      case 'language':
        return (
          <LanguageSettings 
            language={settings.language} 
            onUpdate={(value) => updateFormField('settings', { ...settings, language: value })} 
          />
        );
        
      default:
        return <div>Select a settings section from the sidebar</div>;
    }
  };
  
  return (
    <div className="settings-tab">
      <div className="settings-sidebar">
        <div 
          className={`settings-sidebar-item ${activeSection === 'general' ? 'active' : ''}`}
          onClick={() => setActiveSection('general')}
        >
          General
        </div>
        <div 
          className={`settings-sidebar-item ${activeSection === 'email' ? 'active' : ''}`}
          onClick={() => setActiveSection('email')}
        >
          Email Settings
        </div>
        <div 
          className={`settings-sidebar-item ${activeSection === 'access' ? 'active' : ''}`}
          onClick={() => setActiveSection('access')}
        >
          Access
        </div>
        <div 
          className={`settings-sidebar-item ${activeSection === 'hiddenFields' ? 'active' : ''}`}
          onClick={() => setActiveSection('hiddenFields')}
        >
          Hidden Fields & variables
        </div>
        <div 
          className={`settings-sidebar-item ${activeSection === 'linkSettings' ? 'active' : ''}`}
          onClick={() => setActiveSection('linkSettings')}
        >
          Link Settings
        </div>
        <div 
          className={`settings-sidebar-item ${activeSection === 'language' ? 'active' : ''}`}
          onClick={() => setActiveSection('language')}
        >
          Language
        </div>
      </div>
      
      <div className="settings-content">
        <div className="settings-header">
          <h2>Settings for {formData.title || 'Untitled Form'}</h2>
        </div>
        
        {renderSettingsContent()}
      </div>
    </div>
  );
};

// General Settings Component
const GeneralSettings = ({ settings, onUpdate }) => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2>Display</h2>
      </div>
      
      <div className="settings-group">
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Progress Bar</div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.progressBar} 
                onChange={(e) => onUpdate('progressBar', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Navigation Arrows</div>
            <div className="setting-item-description">
              These are the "Up" and "Down" arrows that are shown in bottom right corner of the form (except mobiles). This helps users in navigating the form, for eg, to go back to previous questions.
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.navigationArrows} 
                onChange={(e) => onUpdate('navigationArrows', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Enable reCaptcha</div>
            <div className="setting-item-description">
              Please disable it if you are using custom domain otherwise your form won't work. We will soon allow you to add your own reCaptcha key for custom domains.
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.enableReCaptcha} 
                onChange={(e) => onUpdate('enableReCaptcha', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Show "Powered By Lalaforms"
              <span className="pro-badge">PRO</span>
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.showPoweredBy} 
                onChange={(e) => onUpdate('showPoweredBy', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Settings Component
const EmailSettings = ({ settings, onUpdate, onNestedUpdate }) => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2>Email Settings</h2>
        <p>Configure email notifications for form submissions</p>
      </div>
      
      <div className="settings-group">
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Receive Email Notifications</div>
            <div className="setting-item-description">
              Receive email notifications when someone submits your form.
              Will send to support@email.com. Purchase pro to configure
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.notifyOnSubmission} 
                onChange={(e) => onUpdate('notifyOnSubmission', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Reply To
              <span className="pro-badge">PRO</span>
            </div>
            <div className="setting-item-description">
              Choose an email block from your form and the answer of that field will be set as Reply To of the notification email.
            </div>
          </div>
          <div className="setting-item-right">
            <select 
              className="form-control"
              value={settings.replyToField}
              onChange={(e) => {
                onUpdate('replyToEnabled', true);
                onUpdate('replyToField', e.target.value);
              }}
              disabled={!settings.replyToEnabled}
            >
              <option value="">Select email field</option>
              <option value="email_1">Email field</option>
            </select>
            <label className="switch mt-2">
              <input 
                type="checkbox" 
                checked={settings.replyToEnabled} 
                onChange={(e) => onUpdate('replyToEnabled', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Email Subject</div>
            <div className="setting-item-description">
              Customize the subject of the notification email using the editor below.
            </div>
          </div>
          <div className="setting-item-right">
            <input 
              type="text"
              className="form-control"
              value={settings.emailSubject}
              onChange={(e) => onUpdate('emailSubject', e.target.value)}
            />
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Email Body
              <span className="pro-badge">PRO</span>
            </div>
            <div className="setting-item-description">
              Customize the body of the notification email using the editor below.
            </div>
          </div>
          <div className="setting-item-right">
            <textarea 
              className="form-control"
              rows="6"
              value={`Hi,

Your form @Form Name just received a new submission.

Here are the details:

@All Answers 

You can View all submissions here

Don't want to receive these emails? You can configure it here

Thanks,
Company Name`}
              readOnly
            />
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <div className="settings-group-title">Auto-Responder Email</div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Send confirmation email to respondent
              <span className="pro-badge">PRO</span>
            </div>
            <div className="setting-item-description">
              Send an automatic confirmation email to the person who submitted the form.
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.autoResponder.enabled} 
                onChange={(e) => onNestedUpdate('autoResponder', 'enabled', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        {settings.autoResponder.enabled && (
          <>
            <div className="setting-item">
              <div className="setting-item-left">
                <div className="setting-item-title">Subject</div>
              </div>
              <div className="setting-item-right">
                <input 
                  type="text"
                  className="form-control"
                  value={settings.autoResponder.subject}
                  onChange={(e) => onNestedUpdate('autoResponder', 'subject', e.target.value)}
                />
              </div>
            </div>
            
            <div className="setting-item">
              <div className="setting-item-left">
                <div className="setting-item-title">Message</div>
              </div>
              <div className="setting-item-right">
                <textarea 
                  className="form-control"
                  rows="6"
                  value={settings.autoResponder.message}
                  onChange={(e) => onNestedUpdate('autoResponder', 'message', e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Access Settings Component
const AccessSettings = ({ settings, onUpdate, onNestedUpdate }) => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2>Access Settings</h2>
        <p>Control who can access and submit your form</p>
      </div>
      
      <div className="settings-group">
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Password Protection
              <span className="pro-badge">PRO</span>
            </div>
            <div className="setting-item-description">
              Protect your form with a password. Only people with the password can access and submit the form.
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.passwordProtection.enabled} 
                onChange={(e) => onNestedUpdate('passwordProtection', 'enabled', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        {settings.passwordProtection.enabled && (
          <div className="setting-item">
            <div className="setting-item-left">
              <div className="setting-item-title">Password</div>
            </div>
            <div className="setting-item-right">
              <input 
                type="text"
                className="form-control"
                value={settings.passwordProtection.password}
                onChange={(e) => onNestedUpdate('passwordProtection', 'password', e.target.value)}
                placeholder="Enter password"
              />
            </div>
          </div>
        )}
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Limit Submissions
              <span className="pro-badge">PRO</span>
            </div>
            <div className="setting-item-description">
              Limit the total number of submissions your form can receive.
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.limitSubmissions.enabled} 
                onChange={(e) => onNestedUpdate('limitSubmissions', 'enabled', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        {settings.limitSubmissions.enabled && (
          <div className="setting-item">
            <div className="setting-item-left">
              <div className="setting-item-title">Maximum submissions</div>
            </div>
            <div className="setting-item-right">
              <input 
                type="number"
                className="form-control"
                value={settings.limitSubmissions.limit}
                onChange={(e) => onNestedUpdate('limitSubmissions', 'limit', parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
          </div>
        )}
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">
              Closing Date
              <span className="pro-badge">PRO</span>
            </div>
            <div className="setting-item-description">
              Set a date after which your form will automatically close and no longer accept submissions.
            </div>
          </div>
          <div className="setting-item-right">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.closingDate.enabled} 
                onChange={(e) => onNestedUpdate('closingDate', 'enabled', e.target.checked)} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        {settings.closingDate.enabled && (
          <div className="setting-item">
            <div className="setting-item-left">
              <div className="setting-item-title">Closing Date and Time</div>
            </div>
            <div className="setting-item-right">
              <input 
                type="datetime-local"
                className="form-control"
                value={settings.closingDate.date || ''}
                onChange={(e) => onNestedUpdate('closingDate', 'date', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Hidden Fields Settings Component
const HiddenFieldsSettings = ({ settings, onUpdate }) => {
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  
  const handleAddHiddenField = () => {
    if (!newFieldName) return;
    
    const updatedFields = [
      ...settings,
      {
        name: newFieldName,
        value: newFieldValue
      }
    ];
    
    onUpdate(updatedFields);
    setNewFieldName('');
    setNewFieldValue('');
  };
  
  const handleRemoveField = (index) => {
    const updatedFields = [...settings];
    updatedFields.splice(index, 1);
    onUpdate(updatedFields);
  };
  
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2>Hidden Fields & Variables</h2>
        <p>Add hidden fields to your form to capture additional information or use variables to customize your form.</p>
      </div>
      
      <div className="settings-group">
        <div className="hidden-fields-list">
          {settings.length === 0 ? (
            <div className="no-hidden-fields">
              No hidden fields added yet.
            </div>
          ) : (
            settings.map((field, index) => (
              <div key={index} className="hidden-field-item">
                <div className="hidden-field-name">{field.name}</div>
                <div className="hidden-field-value">{field.value}</div>
                <button 
                  className="btn-remove-field"
                  onClick={() => handleRemoveField(index)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="add-hidden-field">
          <h4>Add Hidden Field</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Field Name</label>
              <input 
                type="text"
                className="form-control"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="e.g. campaign_source"
              />
            </div>
            <div className="form-group">
              <label>Field Value</label>
              <input 
                type="text"
                className="form-control"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                placeholder="e.g. facebook_ad"
              />
            </div>
            <button 
              className="btn btn-primary btn-add-field"
              onClick={handleAddHiddenField}
              disabled={!newFieldName}
            >
              Add Field
            </button>
          </div>
        </div>
        
        <div className="variables-info">
          <h4>Available Variables</h4>
          <p>You can use these variables in your form:</p>
          <ul>
            <li><code>@url</code> - Form URL</li>
            <li><code>@referring_url</code> - Referring URL</li>
            <li><code>@ip_address</code> - IP Address</li>
            <li><code>@browser</code> - Browser</li>
            <li><code>@device</code> - Device</li>
            <li><code>@timestamp</code> - Submission Time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Link Settings Component
const LinkSettings = ({ settings, onUpdate }) => {
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2>Link Settings</h2>
        <p>Customize how your form appears when shared</p>
      </div>
      
      <div className="settings-group">
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">SEO Title</div>
            <div className="setting-item-description">
              This title will be used in the browser tab and when your form is shared on social media.
            </div>
          </div>
          <div className="setting-item-right">
            <input 
              type="text"
              className="form-control"
              value={settings.seoTitle}
              onChange={(e) => onUpdate('seoTitle', e.target.value)}
              placeholder="Enter SEO title"
            />
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">SEO Description</div>
            <div className="setting-item-description">
              This description will be used when your form is shared on social media.
            </div>
          </div>
          <div className="setting-item-right">
            <textarea 
              className="form-control"
              value={settings.seoDescription}
              onChange={(e) => onUpdate('seoDescription', e.target.value)}
              placeholder="Enter SEO description"
              rows="3"
            />
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Share Image</div>
            <div className="setting-item-description">
              This image will be displayed when your form is shared on social media.
            </div>
          </div>
          <div className="setting-item-right">
            <div className="image-upload-container">
              {settings.shareImage ? (
                <div className="uploaded-image-preview">
                  <img 
                    src={settings.shareImage} 
                    alt="Share"
                  />
                  <button 
                    className="remove-image-btn"
                    onClick={() => onUpdate('shareImage', null)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-outline btn-upload"
                  onClick={() => {/* Image upload logic */}}
                >
                  Upload Image
                </button>
              )}
            </div>
            <p className="upload-tip">Recommended size: 1200 x 630 pixels</p>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-item-left">
            <div className="setting-item-title">Favicon</div>
            <div className="setting-item-description">
              This icon will be displayed in the browser tab.
            </div>
          </div>
          <div className="setting-item-right">
            <div className="image-upload-container">
              {settings.favicon ? (
                <div className="uploaded-image-preview">
                  <img 
                    src={settings.favicon} 
                    alt="Favicon"
                  />
                  <button 
                    className="remove-image-btn"
                    onClick={() => onUpdate('favicon', null)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button 
                  className="btn btn-outline btn-upload"
                  onClick={() => {/* Image upload logic */}}
                >
                  Upload Favicon
                </button>
              )}
            </div>
            <p className="upload-tip">Recommended size: 32 x 32 pixels</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Language Settings Component
const LanguageSettings = ({ language, onUpdate }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' }
  ];
  
  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <h2>Language Settings</h2>
        <p>Choose the language for your form</p>
      </div>
      
      <div className="settings-group">
        <div className="form-group">
          <label>Form Language</label>
          <select 
            className="form-control"
            value={language}
            onChange={(e) => onUpdate(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <p className="language-info">
          This will change the default text for buttons, validation messages, and other system text in your form. Your questions and content will remain unchanged.
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;
