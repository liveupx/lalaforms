// src/services/stripeService.js
import { functions } from '../firebase/config';
import { httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Create checkout session for subscription
export const createCheckoutSession = async (userId, priceId) => {
  try {
    const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');
    const { data } = await createStripeCheckout({ 
      userId, 
      priceId,
      successUrl: `${window.location.origin}/dashboard?checkout=success`,
      cancelUrl: `${window.location.origin}/pricing?checkout=canceled`
    });
    
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });
    
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
};

// Get customer portal session
export const getCustomerPortalSession = async (userId) => {
  try {
    const createPortalSession = httpsCallable(functions, 'createPortalSession');
    const { data } = await createPortalSession({ userId });
    
    window.location.href = data.url;
  } catch (error) {
    throw error;
  }
};

// Get subscription status
export const getSubscriptionStatus = async (userId) => {
  try {
    const getSubscriptionData = httpsCallable(functions, 'getSubscriptionData');
    const { data } = await getSubscriptionData({ userId });
    
    return data;
  } catch (error) {
    throw error;
  }
};