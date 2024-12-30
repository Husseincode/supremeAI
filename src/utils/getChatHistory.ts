/** @format */

import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import your Firestore instance

// Function to get the chat history from Firestore
const getChatHistory = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.chatHistory || []; // Return chat history or an empty array if none exists
  } else {
    console.log('User not found!');
    return [];
  }
};

export { getChatHistory };
