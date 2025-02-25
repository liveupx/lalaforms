// src/services/submissionService.js
import { v4 as uuidv4 } from 'uuid';

// Simulate API delay
const apiDelay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const SUBMISSIONS_STORAGE_KEY = 'lalaforms_submissions';

// Get submissions from storage
const getSubmissionsFromStorage = () => {
  const submissionsJson = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
  return submissionsJson ? JSON.parse(submissionsJson) : [];
};

// Save submissions to storage
const saveSubmissionsToStorage = (submissions) => {
  localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
};

// Fetch submissions for a form
export const fetchSubmissions = async (formId) => {
  await apiDelay();
  
  // In a real app, we would fetch from backend
  const allSubmissions = getSubmissionsFromStorage();
  
  // Filter submissions by formId
  return allSubmissions.filter(submission => submission.formId === formId);
};

// Fetch a single submission
export const fetchSubmission = async (submissionId) => {
  await apiDelay();
  
  const submissions = getSubmissionsFromStorage();
  const submission = submissions.find(sub => sub.id === submissionId);
  
  if (!submission) {
    throw new Error(`Submission with ID ${submissionId} not found`);
  }
  
  return submission;
};

// Submit form data
export const submitForm = async (formId, formData) => {
  await apiDelay();
  
  const submission = {
    id: uuidv4(),
    formId,
    data: formData,
    submittedAt: new Date().toISOString(),
    ipAddress: '127.0.0.1', // Mock IP address
    userAgent: navigator.userAgent
  };
  
  const submissions = getSubmissionsFromStorage();
  submissions.push(submission);
  saveSubmissionsToStorage(submissions);
  
  return submission;
};

// Delete submission
export const deleteSubmission = async (submissionId) => {
  await apiDelay();
  
  const submissions = getSubmissionsFromStorage();
  const updatedSubmissions = submissions.filter(sub => sub.id !== submissionId);
  
  if (submissions.length === updatedSubmissions.length) {
    throw new Error(`Submission with ID ${submissionId} not found`);
  }
  
  saveSubmissionsToStorage(updatedSubmissions);
  
  return { success: true };
};

// Export submissions to CSV
export const exportSubmissionsToCsv = async (formId) => {
  await apiDelay();
  
  const submissions = getSubmissionsFromStorage().filter(
    sub => sub.formId === formId
  );
  
  // In a real app, this would generate a CSV file from submissions
  // For now, just return a fake URL
  return {
    downloadUrl: `https://example.com/exports/${formId}.csv`
  };
};

// Fetch form analytics
export const fetchFormAnalytics = async (formId) => {
  await apiDelay();
  
  // Get submissions for the form
  const submissions = getSubmissionsFromStorage().filter(
    sub => sub.formId === formId
  );
  
  // Generate mock analytics data
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  
  const dailyData = [];
  
  // Generate daily data for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Add random number of views and submissions
    const views = Math.floor(Math.random() * 100) + 10;
    const submissionsCount = Math.floor(Math.random() * views * 0.4);
    
    dailyData.push({
      date: dateString,
      views,
      submissions: submissionsCount,
      completionRate: Math.round((submissionsCount / views) * 100)
    });
  }
  
  // Calculate conversion rate
  const totalViews = dailyData.reduce((sum, day) => sum + day.views, 0);
  const totalSubmissions = dailyData.reduce((sum, day) => sum + day.submissions, 0);
  const conversionRate = totalViews > 0 ? (totalSubmissions / totalViews) * 100 : 0;
  
  // Calculate average completion time (mock data)
  const completionTimes = [];
  for (let i = 0; i < 100; i++) {
    completionTimes.push(Math.floor(Math.random() * 300) + 60); // 1-6 minutes in seconds
  }
  const avgCompletionTime = completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length;
  
  // Field-specific analytics (mock data)
  const fieldAnalytics = {
    completion_rates: {
      'name_field': 95,
      'email_field': 92,
      'feedback_field': 87,
      'rating_field': 94
    },
    dropoff_points: [
      { field_id: 'feedback_field', dropoff_rate: 8 },
      { field_id: 'additional_info', dropoff_rate: 15 }
    ]
  };
  
  // Source analytics (mock data)
  const sourceAnalytics = [
    { source: 'direct', count: Math.floor(Math.random() * 200) + 50 },
    { source: 'email', count: Math.floor(Math.random() * 150) + 30 },
    { source: 'social', count: Math.floor(Math.random() * 100) + 20 },
    { source: 'referral', count: Math.floor(Math.random() * 80) + 10 }
  ];
  
  // Device analytics (mock data)
  const deviceAnalytics = [
    { device: 'desktop', count: Math.floor(Math.random() * 250) + 150 },
    { device: 'mobile', count: Math.floor(Math.random() * 200) + 100 },
    { device: 'tablet', count: Math.floor(Math.random() * 50) + 20 }
  ];
  
  return {
    summary: {
      total_views: totalViews,
      total_submissions: totalSubmissions,
      conversion_rate: conversionRate.toFixed(2),
      avg_completion_time: Math.round(avgCompletionTime),
      submissions_last_30_days: totalSubmissions,
      submissions_previous_30_days: Math.floor(totalSubmissions * 0.8) // Fake previous period
    },
    daily_data: dailyData,
    field_analytics: fieldAnalytics,
    source_analytics: sourceAnalytics,
    device_analytics: deviceAnalytics
  };
};
