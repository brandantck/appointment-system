import _ from 'lodash'

// import {
//   ADD_APPOINTMENT
// } from "../actions/types";

const INITIAL_STATE = {
  "P1": {
    "name": "P1NAME",
    "age": 12,
    "gender": "M",
  },
  "P2": {
    "name": "P2NAME",
    "age": 22,
    "gender": "F",
  },
  "P3": {
    "name":"P3NAME",
    "age": 32,
    "gender": "M",
  },
}

const patientReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return {...state}
  }
}

export default patientReducer

// D1, D1Name, P1, P1Name, 12, M, A1, 08032018 09:00:00
// D1, D1Name, P2, P2Name, 22, F, A3, 08032018 10:00:00
// D2, D2Name, P3, P3Name, 32, M, A7, 18032018 09:00:00