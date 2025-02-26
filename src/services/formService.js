import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct for your project

// Create a new form
export const createForm = async (userId, formData) => {
  try {
    const formsRef = collection(db, 'forms');
    const newForm = {
      ...formData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: false,
      views: 0,
      submissions: 0
    };
    
    const docRef = await addDoc(formsRef, newForm);
    return {
      id: docRef.id,
      ...newForm
    };
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
};

// Create an empty form template
export const createEmptyForm = () => {
  return {
    title: 'Untitled Form',
    description: '',
    blocks: [],
    theme: {
      primaryColor: '#4a4be8',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      font: 'Inter, sans-serif',
      borderRadius: '8px',
      spacing: 'comfortable'
    },
    settings: {
      showProgressBar: true,
      showQuestionNumbers: true,
      allowResubmission: false,
      confirmationMessage: 'Thank you for your submission!',
      redirectUrl: '',
      collectEmailAddresses: false,
      limitOneResponsePerUser: false,
      submitButtonText: 'Submit',
      notificationEmails: []
    }
  };
};

// Get a form by ID (alias for getForm that matches expected function name)
export const fetchFormById = async (formId) => {
  return getForm(formId);
};

// Get a form by ID
export const getForm = async (formId) => {
  try {
    const formRef = doc(db, 'forms', formId);
    const formSnap = await getDoc(formRef);
    
    if (formSnap.exists()) {
      return {
        id: formSnap.id,
        ...formSnap.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting form:', error);
    throw error;
  }
};

// Save form draft (alias for updateForm that matches expected function name)
export const saveDraft = async (formId, formData) => {
  return updateForm(formId, formData);
};

// Get all forms for a user
export const getUserForms = async (userId) => {
  try {
    const formsRef = collection(db, 'forms');
    const q = query(formsRef, where('userId', '==', userId), orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const forms = [];
    querySnapshot.forEach((doc) => {
      forms.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return forms;
  } catch (error) {
    console.error('Error getting user forms:', error);
    throw error;
  }
};

// Update a form
export const updateForm = async (formId, formData) => {
  try {
    const formRef = doc(db, 'forms', formId);
    
    await updateDoc(formRef, {
      ...formData,
      updatedAt: new Date().toISOString()
    });
    
    return {
      id: formId,
      ...formData,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating form:', error);
    throw error;
  }
};

// Delete a form
export const deleteForm = async (formId) => {
  try {
    await deleteDoc(doc(db, 'forms', formId));
    return true;
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error;
  }
};

// Publish or unpublish a form
export const toggleFormPublish = async (formId, publish) => {
  try {
    const formRef = doc(db, 'forms', formId);
    
    await updateDoc(formRef, {
      published: publish,
      updatedAt: new Date().toISOString()
    });
    
    return {
      published: publish
    };
  } catch (error) {
    console.error('Error toggling form publish:', error);
    throw error;
  }
};

// Duplicate a form
export const duplicateForm = async (userId, formId) => {
  try {
    // Get the original form
    const originalForm = await getForm(formId);
    
    if (!originalForm) {
      throw new Error('Form not found');
    }
    
    // Create a new form based on the original
    const newForm = {
      ...originalForm,
      title: `${originalForm.title} (Copy)`,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: false,
      views: 0,
      submissions: 0
    };
    
    // Remove the id property
    delete newForm.id;
    
    // Add the new form to the database
    const formsRef = collection(db, 'forms');
    const docRef = await addDoc(formsRef, newForm);
    
    return {
      id: docRef.id,
      ...newForm
    };
  } catch (error) {
    console.error('Error duplicating form:', error);
    throw error;
  }
};

// Create or update a form theme
export const saveFormTheme = async (userId, themeId, themeData) => {
  try {
    // If themeId is provided, update an existing theme
    if (themeId) {
      const themeRef = doc(db, 'users', userId, 'themes', themeId);
      
      await updateDoc(themeRef, {
        ...themeData,
        updatedAt: new Date().toISOString()
      });
      
      return {
        id: themeId,
        ...themeData,
        updatedAt: new Date().toISOString()
      };
    } 
    // Otherwise, create a new theme
    else {
      const newTheme = {
        ...themeData,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const themesRef = collection(db, 'users', userId, 'themes');
      const docRef = await addDoc(themesRef, newTheme);
      
      return {
        id: docRef.id,
        ...newTheme
      };
    }
  } catch (error) {
    console.error('Error saving form theme:', error);
    throw error;
  }
};

// Get all themes for a user
export const getUserThemes = async (userId) => {
  try {
    const themesRef = collection(db, 'users', userId, 'themes');
    const querySnapshot = await getDocs(themesRef);
    
    const themes = [];
    querySnapshot.forEach((doc) => {
      themes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return themes;
  } catch (error) {
    console.error('Error getting user themes:', error);
    throw error;
  }
};

// Set a specific form settings
export const updateFormSettings = async (formId, settings) => {
  try {
    const formRef = doc(db, 'forms', formId);
    
    await updateDoc(formRef, {
      settings,
      updatedAt: new Date().toISOString()
    });
    
    return {
      id: formId,
      settings,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating form settings:', error);
    throw error;
  }
};

// Set a custom domain for a form
export const setCustomDomain = async (formId, domain) => {
  try {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      customDomain: domain,
      updatedAt: new Date().toISOString()
    });
    
    // Also create an entry in the domains collection for lookup
    const domainRef = doc(db, 'domains', domain);
    await setDoc(domainRef, {
      formId,
      createdAt: new Date().toISOString()
    });
    
    return {
      customDomain: domain
    };
  } catch (error) {
    console.error('Error setting custom domain:', error);
    throw error;
  }
};

export default {
  createForm,
  createEmptyForm,
  fetchFormById,
  getForm,
  getUserForms,
  updateForm,
  saveDraft,
  deleteForm,
  toggleFormPublish,
  duplicateForm,
  saveFormTheme,
  getUserThemes,
  updateFormSettings,
  setCustomDomain
};