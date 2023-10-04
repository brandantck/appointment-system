import {
  FETCH_APPOINTMENTS,
  CANCEL_APPOINTMENT,
  FETCH_AVAILABLE_TIMESLOTS,
} from "../actions/types";

const INITIAL_STATE = {
  appointments: [],
  availableTimeslots: [],
};

const appointmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
      };
    case FETCH_AVAILABLE_TIMESLOTS:
      return {
        ...state,
        availableTimeslots: action.payload,
      };
    case CANCEL_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};

export default appointmentReducer;
