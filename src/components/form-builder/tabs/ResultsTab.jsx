// src/components/form-builder/tabs/ResultsTab.jsx
import React, { useState, useEffect } from 'react';
import { fetchSubmissions, fetchFormAnalytics } from '../../../services/submissionService';
import SubmissionsTable from '../SubmissionsTable';
import SummaryCharts from '../SummaryCharts';
import AnalyticsCharts from '../AnalyticsCharts';

const ResultsTab = ({ formId }) => {
  const [activeSubTab, setActiveSubTab] = useState('submissions');
  const [submissions, setSubmissions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load submissions and analytics data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // This would be actual API calls in a real app
        const submissionsData = await fetchSubmissions(formId);
        const analyticsData = await fetchFormAnalytics(formId);
        
        setSubmissions(submissionsData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load form results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [formId]);
  
  // Export submissions to CSV
  const handleExportCSV = () => {
    // This would be an actual export function in a real app
    alert('Export functionality would be implemented here');
  };
  
  // Render content based on active sub-tab
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading results...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      );
    }
    
    // If there are no submissions yet
    if (submissions.length === 0) {
      return (
        <div>
          {activeSubTab === 'submissions' && (
            <div className="alert-banner">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <p>Heads up</p>
                <p>You have some unpublished changes in your form.</p>
              </div>
            </div>
          )}
          
          <div className="submissions-stats">
            <div className="stat-card">
              <div className="stat-label">Completed</div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Partial</div>
              <div className="stat-value">0</div>
            </div>
          </div>
          
          <div className="empty-submissions">
            <div className="empty-submissions-icon">📊</div>
            <h3 className="empty-submissions-title">No complete submissions yet.</h3>
            <p className="empty-submissions-description">
              Please share your form to the world to start collecting submissions.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                // This would navigate to share tab in a real app
                alert('Navigate to Share tab');
              }}
            >
              Share Form
            </button>
          </div>
        </div>
      );
    }
    
    // Show content based on active tab
    switch (activeSubTab) {
      case 'submissions':
        return (
          <div className="submissions-content">
            <div className="submissions-header">
              <h3>All Submissions ({submissions.length})</h3>
              <div className="submissions-actions">
                <button 
                  className="btn btn-outline"
                  onClick={handleExportCSV}
                >
                  Export CSV
                </button>
              </div>
            </div>
            
            <SubmissionsTable 
              submissions={submissions} 
              formId={formId} 
            />
          </div>
        );
        
      case 'summary':
        return (
          <SummaryCharts 
            analytics={analytics} 
            submissions={submissions} 
          />
        );
        
      case 'analytics':
        return (
          <AnalyticsCharts analytics={analytics} />
        );
        
      default:
        return <div>Select a tab to view results</div>;
    }
  };
  
  return (
    <div className="results-tab">
      <div className="results-container">
        <div className="results-nav">
          <div 
            className={`results-nav-item ${activeSubTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('submissions')}
          >
            Submissions
          </div>
          <div 
            className={`results-nav-item ${activeSubTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('summary')}
          >
            Summary
          </div>
          <div 
            className={`results-nav-item ${activeSubTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('analytics')}
          >
            Analytics
          </div>
        </div>
        
        <div className="results-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ResultsTab;
