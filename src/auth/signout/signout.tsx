/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { signOut } from 'firebase/auth';
import { auth } from '@//utils/firebaseConfig'; // Import the Firebase auth instance

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error: any) {
    console.error('Error signing out:', error.message);
  }
};
