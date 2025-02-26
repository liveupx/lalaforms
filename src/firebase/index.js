// src/firebase/index.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For development purposes, we're using placeholder values
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "development-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "lalaforms.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "lalaforms-dev",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "lalaforms-dev.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Mock Firestore for development
class MockFirestore {
  static data = {
    forms: {},
    users: {},
    submissions: {}
  };

  // Add your mock methods here if needed
}

// Use mock or real Firestore based on environment
const isDevMode = process.env.NODE_ENV === 'development';

export { app, db, auth, storage, MockFirestore };
export default isDevMode ? MockFirestore : db;