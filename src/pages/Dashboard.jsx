// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import FormCard from '../components/dashboard/FormCard';
import EmptyState from '../components/common/EmptyState';
import ProBanner from '../components/dashboard/ProBanner';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeWorkspace, setActiveWorkspace] = useState('My Workspace');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProBanner, setShowProBanner] = useState(true);
  const [showTeamInvite, setShowTeamInvite] = useState(false);
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  
  // Mock user data - would come from auth context in a real app
  const user = {
    name: 'Eden',
    avatar: null, // Placeholder for user avatar
    isPro: false,
    hasDiscount: true
  };
  
  // Simulate fetching forms from API
  useEffect(() => {
    // This would be an API call in a real application
    const fetchForms = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockForms = [
          {
            id: '1',
            title: 'Responsive contact form',
            createdAt: '2025-02-15T12:00:00',
            updatedAt: '2025-02-20T14:30:00',
            responses: 0,
            status: 'closed',
            thumbnail: '#ffcccb', // Light red color as placeholder
            isTemplate: false
          },
          {
            id: '2',
            title: 'Contact Form - Edenmtg.com',
            createdAt: '2025-02-10T10:00:00',
            updatedAt: '2025-02-18T16:45:00',
            responses: 4,
            status: 'published',
            thumbnail: '#f5f5f5', // Light gray color as placeholder
            isTemplate: false
          },
          {
            id: '3',
            title: 'Edenmtg.com - Loan Form',
            createdAt: '2025-02-05T09:30:00',
            updatedAt: '2025-02-21T11:20:00',
            responses: 11,
            status: 'published',
            thumbnail: '#f5f5f5', // Light gray color as placeholder
            isTemplate: false
          },
          {
            id: '4',
            title: 'Client Feedback Form - Edenmtg.com',
            createdAt: '2025-02-01T14:15:00',
            updatedAt: '2025-02-19T09:10:00',
            responses: 0,
            status: 'published',
            thumbnail: '#d6f5f5', // Light blue/teal color as placeholder
            isTemplate: false
          }
        ];
        
        setForms(mockForms);
      } catch (error) {
        console.error("Error fetching forms:", error);
        // Would show an error toast in a real app
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);
  
  // Filter forms based on search query
  const filteredForms = forms.filter(form => 
    form.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="dashboard">
        {/* Survey banner at the top, similar to competitor */}
        {showTeamInvite && (
          <div className="team-invite-banner">
            <div className="banner-content">
              <div className="banner-icon">♥</div>
              <p>Hi {user.name}, Mind taking this <strong>3 questions survey</strong>?</p>
            </div>
            <div className="banner-actions">
              <button className="btn btn-light" onClick={() => setShowTeamInvite(false)}>
                Sure, let's do it →
              </button>
            </div>
          </div>
        )}
        
        {/* Show Pro banner if user is not pro */}
        {!user.isPro && showProBanner && (
          <ProBanner 
            hasDiscount={user.hasDiscount} 
            onClose={() => setShowProBanner(false)} 
          />
        )}
        
        {/* Workspace selector and search bar */}
        <div className="dashboard-header">
          <div className="workspace-selector">
            <button className="workspace-button">
              <span className="workspace-icon">📁</span>
              <span>{activeWorkspace}</span>
              <span className="dropdown-icon">▼</span>
            </button>
            <button className="invite-team-btn">+ Invite Team</button>
          </div>
          
          <div className="dashboard-actions">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search your forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="view-toggle">
              <button 
                className={`view-toggle-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <span className="icon">▦</span>
              </button>
              <button 
                className={`view-toggle-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <span className="icon">☰</span>
              </button>
            </div>
            
            <Link to="/forms/new" className="btn btn-primary new-form-btn">
              <span className="icon">+</span> New Form
            </Link>
          </div>
        </div>
        
        {/* Forms display */}
        <div className="forms-container">
          {isLoading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading your forms...</p>
            </div>
          ) : filteredForms.length > 0 ? (
            <div className={`forms-grid ${view === 'list' ? 'list-view' : ''}`}>
              {filteredForms.map(form => (
                <FormCard 
                  key={form.id}
                  form={form}
                  view={view}
                />
              ))}
              
              {/* Create new form card */}
              <div className="form-card new-form-card">
                <Link to="/forms/new" className="new-form-card-content">
                  <div className="new-form-icon">+</div>
                  <p>Create New Form</p>
                </Link>
              </div>
            </div>
          ) : searchQuery ? (
            <EmptyState
              icon="🔍"
              title="No forms found"
              description={`We couldn't find any forms matching "${searchQuery}"`}
              action={{
                text: "Clear search",
                onClick: () => setSearchQuery('')
              }}
            />
          ) : (
            <EmptyState
              icon="📝"
              title="Create your first form"
              description="Get started by creating a form or using one of our templates"
              action={{
                text: "Create new form",
                to: "/forms/new"
              }}
              secondaryAction={{
                text: "Browse templates",
                to: "/templates"
              }}
            />
          )}
        </div>
        
        {/* What's New Button */}
        <div className="whats-new-button">
          <button className="btn-whats-new">
            <span className="icon">🎁</span>
            What's New
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
