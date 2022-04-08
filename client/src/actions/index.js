import {
  SIGN_IN,
  SIGN_OUT,
  INCREMENT,
  DECREMENT
} from './types';

export const signIn = (userId, userName) => {
  return {
    type: SIGN_IN,
    payload: {userId, userName}
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}


export const incrementCounter = () => {
  return {
    type: INCREMENT
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT
  }
}