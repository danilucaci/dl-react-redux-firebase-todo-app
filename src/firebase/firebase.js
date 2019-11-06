import firebase from "firebase/app";
import "firebase/firestore";

import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

if (process.env.NODE_ENV === "development") {
  window.firebase = firebase;
}

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
