// src/services/formService.js
import { v4 as uuidv4 } from 'uuid';

// Simulate API delay
const apiDelay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const FORMS_STORAGE_KEY = 'lalaforms_forms';

// Get all forms from storage
const getFormsFromStorage = () => {
  const formsJson = localStorage.getItem(FORMS_STORAGE_KEY);
  return formsJson ? JSON.parse(formsJson) : [];
};

// Save forms to storage
const saveFormsToStorage = (forms) => {
  localStorage.setItem(FORMS_STORAGE_KEY, JSON.stringify(forms));
};

// Get user forms
export const getUserForms = async (userId) => {
  await apiDelay();
  
  // In a real app, we would filter by userId
  return getFormsFromStorage();
};

// Get form by ID
export const fetchFormById = async (formId) => {
  await apiDelay();
  
  const forms = getFormsFromStorage();
  const form = forms.find(form => form.id === formId);
  
  if (!form) {
    throw new Error(`Form with ID ${formId} not found`);
  }
  
  return form;
};

// Create empty form
export const createEmptyForm = () => {
  const newForm = {
    id: uuidv4(),
    title: 'Untitled Form',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    blocks: [],
    settings: {
      general: {
        formTitle: 'Untitled Form',
        progressBar: true,
        navigationArrows: true,
        enableReCaptcha: true,
        showPoweredBy: true
      }
    },
    design: {
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
      roundCorners: true
    },
    isPublished: false
  };
  
  return newForm;
};

// Create new form
export const createForm = async (formData) => {
  await apiDelay();
  
  const newForm = {
    ...formData,
    id: formData.id || uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const forms = getFormsFromStorage();
  forms.push(newForm);
  saveFormsToStorage(forms);
  
  return newForm;
};

// Update form
export const updateForm = async (formId, formData) => {
  await apiDelay();
  
  const forms = getFormsFromStorage();
  const formIndex = forms.findIndex(form => form.id === formId);
  
  if (formIndex === -1) {
    throw new Error(`Form with ID ${formId} not found`);
  }
  
  const updatedForm = {
    ...forms[formIndex],
    ...formData,
    updatedAt: new Date().toISOString()
  };
  
  forms[formIndex] = updatedForm;
  saveFormsToStorage(forms);
  
  return updatedForm;
};

// Save form draft
export const saveDraft = async (formData) => {
  await apiDelay();
  
  const forms = getFormsFromStorage();
  const formIndex = forms.findIndex(form => form.id === formData.id);
  
  formData.updatedAt = new Date().toISOString();
  
  if (formIndex === -1) {
    // New form
    forms.push(formData);
  } else {
    // Update existing form
    forms[formIndex] = formData;
  }
  
  saveFormsToStorage(forms);
  
  return formData;
};

// Publish form
export const publishForm = async (formId) => {
  await apiDelay();
  
  const forms = getFormsFromStorage();
  const formIndex = forms.findIndex(form => form.id === formId);
  
  if (formIndex === -1) {
    throw new Error(`Form with ID ${formId} not found`);
  }
  
  forms[formIndex] = {
    ...forms[formIndex],
    isPublished: true,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  saveFormsToStorage(forms);
  
  return forms[formIndex];
};

// Delete form
export const deleteForm = async (formId) => {
  await apiDelay();
  
  const forms = getFormsFromStorage();
  const updatedForms = forms.filter(form => form.id !== formId);
  
  if (forms.length === updatedForms.length) {
    throw new Error(`Form with ID ${formId} not found`);
  }
  
  saveFormsToStorage(updatedForms);
  
  return { success: true };
};

// Duplicate form
export const duplicateForm = async (formId) => {
  await apiDelay();
  
  const forms = getFormsFromStorage();
  const formToDuplicate = forms.find(form => form.id === formId);
  
  if (!formToDuplicate) {
    throw new Error(`Form with ID ${formId} not found`);
  }
  
  const duplicatedForm = {
    ...formToDuplicate,
    id: uuidv4(),
    title: `${formToDuplicate.title} (Copy)`,
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null
  };
  
  forms.push(duplicatedForm);
  saveFormsToStorage(forms);
  
  return duplicatedForm;
};

// Get form templates
export const getFormTemplates = async () => {
  await apiDelay();
  
  // Mock templates
  return [
    {
      id: 'template_1',
      title: 'Contact Form',
      description: 'Simple contact form with name, email, and message',
      category: 'business',
      thumbnail: 'contact_form.jpg'
    },
    {
      id: 'template_2',
      title: 'Event Registration',
      description: 'Collect registrations for your next event',
      category: 'events',
      thumbnail: 'event_registration.jpg'
    },
    {
      id: 'template_3',
      title: 'Customer Feedback',
      description: 'Get feedback from your customers',
      category: 'feedback',
      thumbnail: 'customer_feedback.jpg'
    },
    {
      id: 'template_4',
      title: 'Job Application',
      description: 'Perfect for collecting job applications',
      category: 'business',
      thumbnail: 'job_application.jpg'
    }
  ];
};
