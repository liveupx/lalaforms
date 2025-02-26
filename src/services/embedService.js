// src/services/embedService.js
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Generate embed code
export const generateEmbedCode = async (formId, embedType = 'inline') => {
  try {
    // Get form data to ensure it exists
    const formDoc = await getDoc(doc(db, 'forms', formId));
    if (!formDoc.exists()) {
      throw new Error('Form not found');
    }
    
    // Base URL for embedding
    const baseUrl = process.env.REACT_APP_FORM_EMBED_URL || 'https://forms.lalaforms.com';
    
    let embedCode = '';
    
    switch (embedType) {
      case 'inline':
        embedCode = `<iframe src="${baseUrl}/embed/${formId}" width="100%" height="500px" frameborder="0"></iframe>`;
        break;
      case 'popup':
        embedCode = `
<script src="${baseUrl}/embed.js"></script>
<button onclick="LalaForms.openPopup('${formId}')">Open Form</button>
<script>
  LalaForms.initPopup({
    formId: '${formId}',
    width: '600px',
    height: '80%',
    position: 'center'
  });
</script>`;
        break;
      case 'fullpage':
        embedCode = `
<script src="${baseUrl}/embed.js"></script>
<div id="lalaform-${formId}"></div>
<script>
  LalaForms.renderForm({
    formId: '${formId}',
    container: '#lalaform-${formId}'
  });
</script>`;
        break;
      default:
        throw new Error('Invalid embed type');
    }
    
    return { embedCode };
  } catch (error) {
    throw error;
  }
};

// Update form embedding settings
export const updateEmbedSettings = async (formId, settings) => {
  try {
    await updateDoc(doc(db, 'forms', formId), {
      'settings.embedding': settings
    });
    return { success: true };
  } catch (error) {
    throw error;
  }
};