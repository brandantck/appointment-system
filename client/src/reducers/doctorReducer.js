import _ from 'lodash'

import {
  FETCH_DOCTORS
} from "../actions/types"

const doctorReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_DOCTORS:
      return [...state, ...action.payload]
    default:
      return state
  }
}

export default doctorReducer
