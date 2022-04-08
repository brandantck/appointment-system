import {
  SIGN_IN,
  SIGN_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userName: null,
  isDoctor: null,
}

const authReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      if (action.payload === "D1" || action.payload === "D2") {
        state = {...state, isDoctor: true}
      } else {
        state = {...state, isDoctor: false}
      }
      return {...state, isSignedIn: true, userId: action.payload.userId, userName: action.payload.userName}
    case SIGN_OUT:
      return {...state, isSignedIn: false, userId: null, isDoctor: false};
      default:
        return state;
    }
  };

export default authReducer