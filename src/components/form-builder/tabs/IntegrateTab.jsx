// src/components/form-builder/tabs/IntegrateTab.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const IntegrateTab = ({ formData, updateFormField }) => {
  const [activeIntegration, setActiveIntegration] = useState('email');
  const { currentUser } = useAuth();
  const isPro = currentUser?.isPro || false;
  
  // Get integrations settings from form data or initialize default
  const integrations = formData.integrations || {
    email: {
      enabled: true,
      notifyOnSubmission: true,
      emailTemplate: 'default',
      customSubject: `New submission for ${formData.title || 'your form'}`
    },
    webhook: {
      enabled: false,
      url: '',
      sendMethod: 'POST',
      includeMetadata: true
    },
    googleSheets: {
      enabled: false,
      spreadsheetId: '',
      sheetName: '',
      isAuthorized: false
    },
    slack: {
      enabled: false,
      webhookUrl: '',
      notificationChannel: '',
      isAuthorized: false
    },
    zapier: {
      enabled: false,
      triggerUrl: '',
      isConnected: false
    }
  };
  
  // Update integrations settings
  const updateIntegration = (integration, field, value) => {
    const updatedIntegrations = {
      ...integrations,
      [integration]: {
        ...integrations[integration],
        [field]: value
      }
    };
    
    updateFormField('integrations', updatedIntegrations);
  };
  
  // Handle authorize/connect for external services
  const handleAuthorize = (integration) => {
    // In a real app, this would open OAuth flow or connection UI
    alert(`This would open the authorization flow for ${integration}`);
    
    // For demo, we'll simulate successful connection
    switch (integration) {
      case 'googleSheets':
        updateIntegration('googleSheets', 'isAuthorized', true);
        break;
      case 'slack':
        updateIntegration('slack', 'isAuthorized', true);
        break;
      case 'zapier':
        updateIntegration('zapier', 'isConnected', true);
        break;
      default:
        break;
    }
  };
  
  // Handle the display of different integration settings
  const renderIntegrationContent = () => {
    switch (activeIntegration) {
      case 'email':
        return (
          <div className="integration-content-panel">
            <div className="section-header">
              <h2>Email Notifications</h2>
              <p>Send and receive emails for each submission.</p>
            </div>
            
            <div className="integration-setting">
              <div className="setting-label">
                <h3>Receive Email Notifications</h3>
                <p>Get notified via email when someone submits your form.</p>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={integrations.email.notifyOnSubmission} 
                    onChange={(e) => updateIntegration('email', 'notifyOnSubmission', e.target.checked)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            <div className="integration-setting">
              <div className="setting-label">
                <h3>Reply To</h3>
                <p>Choose an email field from your form to set as the Reply-To address.</p>
                {!isPro && <span className="pro-badge">PRO</span>}
              </div>
              <div className="setting-control">
                <select 
                  className="form-control"
                  disabled={!isPro}
                >
                  <option value="">Select an email field</option>
                  <option value="email_field">Email Address</option>
                </select>
              </div>
            </div>
            
            <div className="integration-setting">
              <div className="setting-label">
                <h3>Email Subject</h3>
                <p>Customize the subject of notification emails.</p>
              </div>
              <div className="setting-control">
                <input 
                  type="text"
                  className="form-control"
                  value={integrations.email.customSubject}
                  onChange={(e) => updateIntegration('email', 'customSubject', e.target.value)}
                  placeholder="New form submission"
                />
              </div>
            </div>
            
            <div className="integration-setting">
              <div className="setting-label">
                <h3>Email Template</h3>
                <p>Customize the body of notification emails.</p>
                {!isPro && <span className="pro-badge">PRO</span>}
              </div>
              <div className="setting-control">
                <div className="email-template-preview">
                  <div className="email-preview-header">
                    <h4>Email Preview</h4>
                    {!isPro && <p>Upgrade to PRO to customize email templates</p>}
                  </div>
                  <div className="email-preview-content">
                    <pre>
                      {`Hi,

Your form '${formData.title || 'Untitled Form'}' just received a new submission.

Here are the details:

@All Answers 

You can view all submissions here.

Thanks,
Lalaforms`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="integration-setting">
              <div className="setting-label">
                <h3>Email to Respondent</h3>
                <p>Send a confirmation email to the person who submitted the form.</p>
                {!isPro && <span className="pro-badge">PRO</span>}
              </div>
              <div className="setting-control">
                <button 
                  className="btn btn-outline"
                  disabled={!isPro}
                >
                  Configure Autoresponder
                </button>
              </div>
            </div>
            
            <div className="configure-link">
              <a href="#settings">Configure email settings →</a>
            </div>
          </div>
        );
        
      case 'webhook':
        return (
          <div className="integration-content-panel">
            <div className="section-header">
              <h2>Webhook</h2>
              <p>Receive a webhook for all submissions.</p>
            </div>
            
            <div className="integration-setting">
              <div className="setting-label">
                <h3>Enable Webhook</h3>
                <p>Send form submissions to a webhook URL.</p>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={integrations.webhook.enabled} 
                    onChange={(e) => updateIntegration('webhook', 'enabled', e.target.checked)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            
            {integrations.webhook.enabled && (
              <>
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Webhook URL</h3>
                    <p>Enter the URL where submission data should be sent.</p>
                  </div>
                  <div className="setting-control">
                    <input 
                      type="text"
                      className="form-control"
                      value={integrations.webhook.url}
                      onChange={(e) => updateIntegration('webhook', 'url', e.target.value)}
                      placeholder="https://example.com/webhook"
                    />
                  </div>
                </div>
                
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>HTTP Method</h3>
                    <p>Select the HTTP method to use for webhook requests.</p>
                  </div>
                  <div className="setting-control">
                    <select 
                      className="form-control"
                      value={integrations.webhook.sendMethod}
                      onChange={(e) => updateIntegration('webhook', 'sendMethod', e.target.value)}
                    >
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="PATCH">PATCH</option>
                    </select>
                  </div>
                </div>
                
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Include Metadata</h3>
                    <p>Send additional metadata with each submission (IP, timestamp, etc.)</p>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={integrations.webhook.includeMetadata} 
                        onChange={(e) => updateIntegration('webhook', 'includeMetadata', e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                
                <div className="webhook-test">
                  <button className="btn btn-primary">
                    Test Webhook
                  </button>
                </div>
              </>
            )}
          </div>
        );
        
      case 'googleSheets':
        return (
          <div className="integration-content-panel">
            <div className="section-header">
              <h2>Google Sheets</h2>
              <p>Sync all your submissions to a Google Sheet stored on your Google Drive.</p>
            </div>
            
            {integrations.googleSheets.isAuthorized ? (
              <>
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Status</h3>
                  </div>
                  <div className="setting-control">
                    <div className="status-badge connected">
                      <span className="status-icon">✓</span>
                      Connected to Google Sheets
                    </div>
                  </div>
                </div>
                
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Enable Sync</h3>
                    <p>Automatically sync new submissions to Google Sheets.</p>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={integrations.googleSheets.enabled} 
                        onChange={(e) => updateIntegration('googleSheets', 'enabled', e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                
                {integrations.googleSheets.enabled && (
                  <>
                    <div className="integration-setting">
                      <div className="setting-label">
                        <h3>Spreadsheet</h3>
                        <p>Select or create a spreadsheet to sync your form submissions.</p>
                      </div>
                      <div className="setting-control">
                        <select 
                          className="form-control"
                          value={integrations.googleSheets.spreadsheetId}
                          onChange={(e) => updateIntegration('googleSheets', 'spreadsheetId', e.target.value)}
                        >
                          <option value="">Select a spreadsheet</option>
                          <option value="sheet1">My Submissions</option>
                          <option value="sheet2">Customer Data</option>
                          <option value="create">+ Create new spreadsheet</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="integration-setting">
                      <div className="setting-label">
                        <h3>Sheet Name</h3>
                        <p>Enter a name for the sheet where your submissions will be stored.</p>
                      </div>
                      <div className="setting-control">
                        <input 
                          type="text"
                          className="form-control"
                          value={integrations.googleSheets.sheetName}
                          onChange={(e) => updateIntegration('googleSheets', 'sheetName', e.target.value)}
                          placeholder="Form Submissions"
                        />
                      </div>
                    </div>
                    
                    <div className="sheets-test">
                      <button className="btn btn-primary">
                        Test Connection
                      </button>
                    </div>
                  </>
                )}
                
                <div className="disconnect-link">
                  <button 
                    className="btn-text"
                    onClick={() => updateIntegration('googleSheets', 'isAuthorized', false)}
                  >
                    Disconnect from Google Sheets
                  </button>
                </div>
              </>
            ) : (
              <div className="connect-container">
                <button 
                  className="btn btn-primary btn-connect"
                  onClick={() => handleAuthorize('googleSheets')}
                >
                  <span className="google-icon">G</span>
                  Authorize with Google
                </button>
                <p className="connect-info">
                  We'll open a new window to securely connect to your Google account.
                  No data will be shared without your permission.
                </p>
              </div>
            )}
          </div>
        );
        
      case 'slack':
        return (
          <div className="integration-content-panel">
            <div className="section-header">
              <h2>Slack</h2>
              <p>Get real time notifications in your Slack workspace for every new submission.</p>
            </div>
            
            {integrations.slack.isAuthorized ? (
              <>
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Status</h3>
                  </div>
                  <div className="setting-control">
                    <div className="status-badge connected">
                      <span className="status-icon">✓</span>
                      Connected to Slack
                    </div>
                  </div>
                </div>
                
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Enable Notifications</h3>
                    <p>Send notifications to Slack when a form is submitted.</p>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={integrations.slack.enabled} 
                        onChange={(e) => updateIntegration('slack', 'enabled', e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                
                {integrations.slack.enabled && (
                  <>
                    <div className="integration-setting">
                      <div className="setting-label">
                        <h3>Slack Channel</h3>
                        <p>Select the channel where notifications will be sent.</p>
                      </div>
                      <div className="setting-control">
                        <select 
                          className="form-control"
                          value={integrations.slack.notificationChannel}
                          onChange={(e) => updateIntegration('slack', 'notificationChannel', e.target.value)}
                        >
                          <option value="">Select a channel</option>
                          <option value="general">#general</option>
                          <option value="submissions">#submissions</option>
                          <option value="customer-data">#customer-data</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="slack-test">
                      <button className="btn btn-primary">
                        Send Test Notification
                      </button>
                    </div>
                  </>
                )}
                
                <div className="disconnect-link">
                  <button 
                    className="btn-text"
                    onClick={() => updateIntegration('slack', 'isAuthorized', false)}
                  >
                    Disconnect from Slack
                  </button>
                </div>
              </>
            ) : (
              <div className="connect-container">
                <button 
                  className="btn btn-primary btn-connect"
                  onClick={() => handleAuthorize('slack')}
                >
                  <span className="slack-icon">#</span>
                  Authorize with Slack
                </button>
                <p className="connect-info">
                  We'll open a new window to securely connect to your Slack workspace.
                  No data will be shared without your permission.
                </p>
              </div>
            )}
          </div>
        );
        
      case 'zapier':
        return (
          <div className="integration-content-panel">
            <div className="section-header">
              <h2>Zapier</h2>
              <p>Connect your form to Zapier for automation and send data to 6000+ apps.</p>
            </div>
            
            {integrations.zapier.isConnected ? (
              <>
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Status</h3>
                  </div>
                  <div className="setting-control">
                    <div className="status-badge connected">
                      <span className="status-icon">✓</span>
                      Connected to Zapier
                    </div>
                  </div>
                </div>
                
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Enable Integration</h3>
                    <p>Send form submissions to Zapier.</p>
                  </div>
                  <div className="setting-control">
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={integrations.zapier.enabled} 
                        onChange={(e) => updateIntegration('zapier', 'enabled', e.target.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                
                <div className="integration-setting">
                  <div className="setting-label">
                    <h3>Webhook URL</h3>
                    <p>Copy this URL into your Zapier trigger webhook setup.</p>
                  </div>
                  <div className="setting-control">
                    <div className="webhook-url-container">
                      <input 
                        type="text"
                        className="form-control"
                        value={`https://hooks.lalaforms.com/triggers/${formData.id || 'demo-form'}`}
                        readOnly
                      />
                      <button className="btn btn-outline btn-copy">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="zapier-info">
                  <h4>How to set up Zapier integration:</h4>
                  <ol>
                    <li>Create a new Zap in Zapier</li>
                    <li>Select "Webhook" as trigger app</li>
                    <li>Select "Catch Hook" as trigger event</li>
                    <li>Copy and paste the webhook URL above</li>
                    <li>Test the trigger by submitting your form</li>
                    <li>Set up your desired actions in Zapier</li>
                  </ol>
                </div>
                
                <div className="disconnect-link">
                  <button 
                    className="btn-text"
                    onClick={() => updateIntegration('zapier', 'isConnected', false)}
                  >
                    Disconnect from Zapier
                  </button>
                </div>
              </>
            ) : (
              <div className="connect-container">
                <button 
                  className="btn btn-primary btn-connect"
                  onClick={() => handleAuthorize('zapier')}
                >
                  <span className="zapier-icon">Z</span>
                  Connect with Zapier
                </button>
                <p className="connect-info">
                  After connecting, you'll be able to use form submissions as triggers in your Zapier workflows.
                </p>
              </div>
            )}
          </div>
        );
        
      case 'ai':
        return (
          <div className="integration-content-panel">
            <div className="section-header">
              <h2>AI Form Generation</h2>
              <p>Use OpenAI to generate forms from text prompts or to analyze your form data.</p>
              <div className="coming-soon-badge">Coming Soon</div>
            </div>
            
            <div className="ai-feature-preview">
              <div className="ai-feature-container">
                <div className="ai-feature">
                  <div className="ai-feature-icon">✨</div>
                  <h3>Generate Forms with Prompts</h3>
                  <p>Simply describe what kind of form you need, and AI will create it for you.</p>
                  <div className="feature-example">
                    <div className="example-prompt">
                      "Create a customer feedback form with questions about product quality, delivery experience, and overall satisfaction."
                    </div>
                    <div className="example-result">
                      <span className="arrow">➔</span>
                      Complete form with all necessary fields and logic
                    </div>
                  </div>
                </div>
                
                <div className="ai-feature">
                  <div className="ai-feature-icon">📊</div>
                  <h3>Smart Response Analysis</h3>
                  <p>Get AI-powered insights from your form submissions.</p>
                  <div className="feature-example">
                    <div className="example-prompt">
                      "Analyze sentiment trends from our customer feedback responses."
                    </div>
                    <div className="example-result">
                      <span className="arrow">➔</span>
                      Detailed analysis with key insights and recommendations
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="notify-container">
                <p>We're excited to bring these AI features to Lalaforms soon! Enter your email to be notified when they're ready.</p>
                <div className="notify-input">
                  <input 
                    type="email"
                    placeholder="Your email address"
                    className="form-control"
                  />
                  <button className="btn btn-primary">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select an integration from the sidebar</div>;
    }
  };
  
  return (
    <div className="integrate-tab">
      <div className="integration-sidebar">
        <div 
          className={`integration-sidebar-item ${activeIntegration === 'email' ? 'active' : ''}`}
          onClick={() => setActiveIntegration('email')}
        >
          <div className="integration-icon">✉️</div>
          <div className="integration-info">
            <h3>Email</h3>
            <p>Send and receive emails for each submission.</p>
          </div>
        </div>
        
        <div 
          className={`integration-sidebar-item ${activeIntegration === 'webhook' ? 'active' : ''}`}
          onClick={() => setActiveIntegration('webhook')}
        >
          <div className="integration-icon">🔄</div>
          <div className="integration-info">
            <h3>Webhook</h3>
            <p>Receive a webhook for all submissions.</p>
          </div>
        </div>
        
        <div 
          className={`integration-sidebar-item ${activeIntegration === 'googleSheets' ? 'active' : ''}`}
          onClick={() => setActiveIntegration('googleSheets')}
        >
          <div className="integration-icon">📊</div>
          <div className="integration-info">
            <h3>Google Sheets</h3>
            <p>Sync all your submissions to a Google Sheet.</p>
          </div>
        </div>
        
        <div 
          className={`integration-sidebar-item ${activeIntegration === 'slack' ? 'active' : ''}`}
          onClick={() => setActiveIntegration('slack')}
        >
          <div className="integration-icon">#</div>
          <div className="integration-info">
            <h3>Slack</h3>
            <p>Get notifications in your Slack workspace.</p>
          </div>
        </div>
        
        <div 
          className={`integration-sidebar-item ${activeIntegration === 'zapier' ? 'active' : ''}`}
          onClick={() => setActiveIntegration('zapier')}
        >
          <div className="integration-icon">Z</div>
          <div className="integration-info">
            <h3>Zapier</h3>
            <p>Connect to 6000+ apps with Zapier.</p>
          </div>
        </div>
        
        <div 
          className={`integration-sidebar-item ${activeIntegration === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveIntegration('ai')}
        >
          <div className="integration-icon">🧠</div>
          <div className="integration-info">
            <h3>AI Integration</h3>
            <p>Generate forms with OpenAI.</p>
            <span className="coming-soon">Coming Soon</span>
          </div>
        </div>
      </div>
      
      <div className="integration-content">
        {renderIntegrationContent()}
      </div>
    </div>
  );
};

export default IntegrateTab;
