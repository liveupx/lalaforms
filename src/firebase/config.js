import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Fallback to temporary config for debugging if env vars aren't available
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "paste-your-key-here-temporarily",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
};

console.log("Firebase config:", {
  apiKey: firebaseConfig.apiKey ? "CONFIGURED" : "MISSING",
  authDomain: firebaseConfig.authDomain ? "CONFIGURED" : "MISSING",
  projectId: firebaseConfig.projectId ? "CONFIGURED" : "MISSING"
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { app, auth, db, storage, functions };