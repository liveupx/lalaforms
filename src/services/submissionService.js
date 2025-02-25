import axios from 'axios';

// API base URL - replace with your actual API endpoint if you have one
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Mock data for development purposes
const mockSubmissions = [
  {
    id: '1',
    formId: 'form1',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    data: { name: 'John Doe', email: 'john@example.com', message: 'This is a test submission' }
  },
  {
    id: '2',
    formId: 'form1',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    data: { name: 'Jane Smith', email: 'jane@example.com', message: 'Another test submission' }
  },
  {
    id: '3',
    formId: 'form1',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    data: { name: 'Bob Johnson', email: 'bob@example.com', message: 'Third test submission' }
  }
];

// Create a new submission
export const createSubmission = async (formId, data) => {
  try {
    // In a real app, you'd use this:
    // const response = await axios.post(`${API_URL}/forms/${formId}/submissions`, { data });
    // return response.data;
    
    // For development, return a mock response
    return {
      id: Date.now().toString(),
      formId,
      createdAt: new Date().toISOString(),
      data
    };
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
};

// Get a specific submission
export const getSubmission = async (formId, submissionId) => {
  try {
    // In a real app, you'd use this:
    // const response = await axios.get(`${API_URL}/forms/${formId}/submissions/${submissionId}`);
    // return response.data;
    
    // For development, return a mock submission
    const submission = mockSubmissions.find(s => s.id === submissionId);
    return submission || null;
  } catch (error) {
    console.error('Error getting submission:', error);
    throw error;
  }
};

// Get all submissions for a form
export const getFormSubmissions = async (formId) => {
  try {
    // In a real app, you'd use this:
    // const response = await axios.get(`${API_URL}/forms/${formId}/submissions`);
    // return response.data;
    
    // For development, return mock submissions
    return mockSubmissions.filter(s => s.formId === formId);
  } catch (error) {
    console.error('Error getting form submissions:', error);
    throw error;
  }
};

// Delete a submission
export const deleteSubmission = async (formId, submissionId) => {
  try {
    // In a real app, you'd use this:
    // await axios.delete(`${API_URL}/forms/${formId}/submissions/${submissionId}`);
    // return true;
    
    // For development, just return true
    return true;
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw error;
  }
};

// Get submission statistics (views, completion rate, etc.)
export const getSubmissionStats = async (formId) => {
  try {
    // In a real app, you'd use this:
    // const response = await axios.get(`${API_URL}/forms/${formId}/stats`);
    // return response.data;
    
    // For development, return mock stats
    return {
      views: 145,
      starts: 98,
      completions: 76,
      completionRate: 77.55,
      averageCompletionTime: '2m 34s',
      fieldAnalytics: [
        { fieldId: 'field1', label: 'Name', completionRate: 98 },
        { fieldId: 'field2', label: 'Email', completionRate: 95 },
        { fieldId: 'field3', label: 'Message', completionRate: 82 }
      ]
    };
  } catch (error) {
    console.error('Error getting submission stats:', error);
    throw error;
  }
};

// Get mock submissions for development
export const getMockSubmissions = () => {
  return mockSubmissions;
};

// These are the missing functions that are being imported in your components

// Alias for getFormSubmissions (used in ResultsTab.jsx)
export const fetchSubmissions = async (formId) => {
  return getFormSubmissions(formId);
};

// Alias for getSubmissionStats (used in ResultsTab.jsx)
export const fetchFormAnalytics = async (formId) => {
  return getSubmissionStats(formId);
};

// Alias for createSubmission (used in FormPreview.jsx)
export const submitForm = async (formId, data) => {
  return createSubmission(formId, data);
};

// Export a service hook if needed (for React components)
export const useSubmissionService = () => {
  return {
    createSubmission,
    getSubmission,
    getFormSubmissions,
    deleteSubmission,
    getSubmissionStats,
    fetchSubmissions,
    fetchFormAnalytics,
    submitForm
  };
};

export default {
  createSubmission,
  getSubmission,
  getFormSubmissions,
  deleteSubmission,
  getSubmissionStats,
  getMockSubmissions,
  fetchSubmissions,
  fetchFormAnalytics,
  submitForm,
  useSubmissionService
};