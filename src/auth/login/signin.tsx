/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@//utils/firebaseConfig'; // Import the Firebase auth instance

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error.message);
  }
};
