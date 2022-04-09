import {
  FETCH_APPOINTMENTS,
  CANCEL_APPOINTMENT,
} from "../actions/types";

const appointmentReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS:
      // return [...state, ...action.payload]
      return action.payload
    case CANCEL_APPOINTMENT:
      return state.filter(e => e.id !== action.payload)
    default:
      return state
  }
}

export default appointmentReducer