const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: functions.config().brevo.user,
    pass: functions.config().brevo.password
  }
});

// Send form submission notification
exports.sendSubmissionNotification = functions.firestore
  .document('submissions/{submissionId}')
  .onCreate(async (snapshot, context) => {
    const submissionData = snapshot.data();
    const { formId } = submissionData;
    
    try {
      // Get form data
      const formDoc = await admin.firestore().collection('forms').doc(formId).get();
      
      if (!formDoc.exists) {
        console.error('Form not found:', formId);
        return null;
      }
      
      const formData = formDoc.data();
      
      // Get user (form owner) data
      const userDoc = await admin.firestore().collection('users').doc(formData.userId).get();
      
      if (!userDoc.exists) {
        console.error('User not found:', formData.userId);
        return null;
      }
      
      const userData = userDoc.data();
      
      // Format submission data for email
      const formattedSubmission = Object.entries(submissionData.data)
        .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
        .join('<br>');
      
      // Send email notification
      await transporter.sendMail({
        from: '"LalaForms" <notifications@lalaforms.com>',
        to: userData.email,
        subject: `New submission for: ${formData.title}`,
        html: `
          <h2>New Form Submission</h2>
          <p>You have received a new submission for your form: <strong>${formData.title}</strong></p>
          <h3>Submission Details:</h3>
          <p>${formattedSubmission}</p>
          <p>View all submissions in your <a href="${process.env.APP_URL}/dashboard/forms/${formId}/submissions">dashboard</a>.</p>
        `
      });
      
      return null;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  });

// Handle Stripe webhooks (simplified example)
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body;
  
  try {
    // Handle the event based on type
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.status(200).send('Event processed');
  } catch (error) {
    console.error('Error processing Stripe webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

// Handle checkout completed event
async function handleCheckoutCompleted(session) {
  // Implementation details would go here
  console.log('Checkout completed:', session);
}

// Other webhook handlers would be implemented here