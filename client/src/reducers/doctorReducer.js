import {
  FETCH_DOCTORS
} from "../actions/types"

const doctorReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_DOCTORS:
      // return [...state, ...action.payload]
      return action.payload
    default:
      return state
  }
}

export default doctorReducer
