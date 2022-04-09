import {
  SIGN_IN,
  SIGN_OUT,
  AUTH_DOCTOR,
} from './types';

export const signIn = (userId, userName) => {
  return {
    type: SIGN_IN,
    payload: { userId, userName }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const authDoctor = () => {
  return {
    type: AUTH_DOCTOR
  }
}