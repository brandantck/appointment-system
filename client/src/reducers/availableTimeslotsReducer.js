import {
  FETCH_AVAILABLE_TIMESLOTS,
} from "../actions/types";

const appointmentReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_TIMESLOTS:
      return action.payload
    default:
      return state
  }
}

export default appointmentReducer