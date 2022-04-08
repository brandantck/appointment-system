import _ from 'lodash'

import {
  FETCH_PATIENTS
} from "../actions/types"

const patientReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return [...state, ...action.payload]
    default:
      return state
  }
}

export default patientReducer
