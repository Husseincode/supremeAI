/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

// initializeUserData.ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@//utils/firebaseConfig'; // Import your Firestore instance

const initializeUserData = async (user: any) => {
  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || '',
    createdAt: new Date(),
    chatHistory: [], // Initialize with empty chat history
  });
  console.log('User data initialized in Firestore.');
};

export { initializeUserData };
