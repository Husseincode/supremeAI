/** @format */

// /** @format */

// // firebaseConfig.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// // Replace with your Firebase project configuration
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCmzTMIHbYnOChuSfcMYINd0tKiDYd_UgQ',
  authDomain: 'jarvis-875df.firebaseapp.com',
  databaseURL: 'https://jarvis-875df-default-rtdb.firebaseio.com',
  projectId: 'jarvis-875df',
  storageBucket: 'jarvis-875df.firebasestorage.app',
  messagingSenderId: '312282753790',
  appId: '1:312282753790:web:d0886e5a88c996828913af',
  measurementId: 'G-NMYZBRJD5X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication instance
const db = getFirestore(app);

export { auth, db };
