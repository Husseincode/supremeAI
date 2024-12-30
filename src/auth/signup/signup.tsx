/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@//utils/firebaseConfig'; // Import the Firebase auth instance

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('User signed up:', userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing up:', error.message);
  }
};
