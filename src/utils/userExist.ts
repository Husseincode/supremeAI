/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

const auth = getAuth();

export const checkCredentialsBeforeSignIn = async (
  email: string,
  password: string
) => {
  try {
    // First, check if the email is registered
    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.length > 0) {
      // If the email is registered, attempt to sign in
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('User signed in successfully:', userCredential.user);
        return true;
      } catch (signInError: any) {
        // Handle sign-in errors (wrong password, etc.)
        console.error('Error signing in:', signInError.message);
        return false;
      }
    } else {
      console.log('No account exists for this email.');
      return false;
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
};
