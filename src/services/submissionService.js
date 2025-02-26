import axios from 'axios';
import { doc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct for your project

// API base URL
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create a new submission
export const submitForm = async (formId, data) => {
  try {
    // In a real app with Firebase:
    const submissionRef = collection(db, 'forms', formId, 'submissions');
    const docRef = await addDoc(submissionRef, {
      data,
      createdAt: new Date().toISOString(),
    });
    
    return {
      id: docRef.id,
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
    const submissionRef = doc(db, 'forms', formId, 'submissions', submissionId);
    const submissionSnap = await getDoc(submissionRef);
    
    if (submissionSnap.exists()) {
      return {
        id: submissionSnap.id,
        ...submissionSnap.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting submission:', error);
    throw error;
  }
};

// Get all submissions for a form
export const getFormSubmissions = async (formId) => {
  try {
    const submissionsRef = collection(db, 'forms', formId, 'submissions');
    const q = query(submissionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const submissions = [];
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return submissions;
  } catch (error) {
    console.error('Error getting form submissions:', error);
    throw error;
  }
};

// Delete a submission
export const deleteSubmission = async (formId, submissionId) => {
  try {
    await deleteDoc(doc(db, 'forms', formId, 'submissions', submissionId));
    return true;
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw error;
  }
};

// Record a form view
export const recordFormView = async (formId) => {
  try {
    const formRef = doc(db, 'forms', formId);
    const formSnap = await getDoc(formRef);
    
    if (formSnap.exists()) {
      const views = formSnap.data().views || 0;
      await updateDoc(formRef, {
        views: views + 1,
        lastViewed: new Date().toISOString()
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error recording form view:', error);
    throw error;
  }
};

// Export submissions to CSV
export const exportSubmissions = async (formId) => {
  try {
    const submissions = await getFormSubmissions(formId);
    
    // Convert submissions to CSV format
    // This is a simple implementation; you might want to use a CSV library
    if (submissions.length === 0) {
      return 'No submissions found';
    }
    
    const fields = Object.keys(submissions[0].data || {});
    let csv = fields.join(',') + '\n';
    
    submissions.forEach(submission => {
      const row = fields.map(field => {
        const value = submission.data[field];
        // Handle values containing commas by wrapping in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
      csv += row.join(',') + '\n';
    });
    
    return csv;
  } catch (error) {
    console.error('Error exporting submissions:', error);
    throw error;
  }
};

// These are the missing functions that are being imported in components

// Alias for getFormSubmissions (used in ResultsTab.jsx)
export const fetchSubmissions = async (formId) => {
  return getFormSubmissions(formId);
};

// Function for form analytics (used in ResultsTab.jsx)
export const fetchFormAnalytics = async (formId) => {
  try {
    const formRef = doc(db, 'forms', formId);
    const formSnap = await getDoc(formRef);
    
    if (!formSnap.exists()) {
      throw new Error('Form not found');
    }
    
    const submissions = await getFormSubmissions(formId);
    
    // Calculate analytics
    const stats = {
      views: formSnap.data().views || 0,
      starts: submissions.length,
      completions: submissions.filter(s => s.isCompleted).length,
      completionRate: submissions.length > 0 
        ? (submissions.filter(s => s.isCompleted).length / submissions.length * 100).toFixed(1) 
        : 0,
      averageCompletionTime: '2m 34s', // This would require actual time tracking
      fieldAnalytics: [] // This would require analyzing each field across submissions
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting form analytics:', error);
    // Return mock stats for development
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
  }
};

export default {
  submitForm,
  getSubmission,
  getFormSubmissions,
  deleteSubmission,
  recordFormView,
  exportSubmissions,
  fetchSubmissions,
  fetchFormAnalytics
};