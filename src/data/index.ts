/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  faSignIn,
  faSignOut,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { URLs } from '../utils/routes';

export const sideBarData: { name: string; url: string; icon: any }[] = [
  {
    name: 'Log in',
    url: URLs.login,
    icon: faSignIn,
  },
  {
    name: 'Sign up',
    url: URLs.signUp,
    icon: faUserCircle,
  },
  {
    name: 'Log out',
    url: '#',
    icon: faSignOut,
  },
];
