import _ from 'lodash'

// import {
//   ADD_APPOINTMENT
// } from "../actions/types";

const INITIAL_STATE = {
  "D1": "D1NAME",
  "D2": "D1NAME",
}

const doctorReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return {...state}
  }
}

export default doctorReducer
