import {
  FETCH_APPOINTMENTS,
  CANCEL_APPOINTMENT,
  FETCH_DOCTOR_APPOINTMENTS_BY_DATE,
} from "../actions/types";

const appointmentReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS:
      return action.payload
    case FETCH_DOCTOR_APPOINTMENTS_BY_DATE:
      return action.payload
    case CANCEL_APPOINTMENT:
      return state.filter(e => e.id !== action.payload)
    default:
      return state
  }
}

export default appointmentReducer