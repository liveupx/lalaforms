// functions/email.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const SibApiV3Sdk = require('@sendinblue/client');

// Configure Brevo API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = SibApiV3Sdk.ApiClient.instance.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Send form submission notification to form owner
exports.sendSubmissionEmail = functions.https.onCall(async (data, context) => {
  // Implementation code here
  // Similar to what was provided in previous response but using Brevo API
});

// Other email functions similarly adapted