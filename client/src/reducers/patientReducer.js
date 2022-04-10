import {
  FETCH_PATIENTS
} from "../actions/types"

const patientReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return action.payload
    default:
      return state
  }
}

export default patientReducer
