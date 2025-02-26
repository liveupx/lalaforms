// src/services/emailService.js
import { functions } from '../firebase/config';
import { httpsCallable } from 'firebase/functions';

// Send form submission notification
export const sendFormSubmissionNotification = async (formId, submissionId) => {
  try {
    const sendSubmissionEmail = httpsCallable(functions, 'sendSubmissionEmail');
    const { data } = await sendSubmissionEmail({ formId, submissionId });
    return data;
  } catch (error) {
    throw error;
  }
};

// Send form submission confirmation to respondent
export const sendSubmissionConfirmation = async (formId, submissionId, recipientEmail) => {
  try {
    const sendConfirmationEmail = httpsCallable(functions, 'sendConfirmationEmail');
    const { data } = await sendConfirmationEmail({ 
      formId, 
      submissionId, 
      recipientEmail 
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Send team invitation
export const sendTeamInvitation = async (teamId, inviteeEmail, inviterName) => {
  try {
    const sendInvitationEmail = httpsCallable(functions, 'sendTeamInvitation');
    const { data } = await sendInvitationEmail({ 
      teamId, 
      inviteeEmail, 
      inviterName 
    });
    return data;
  } catch (error) {
    throw error;
  }
};