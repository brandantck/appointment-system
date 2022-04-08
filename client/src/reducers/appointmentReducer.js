import _ from 'lodash'

import {
  ADD_APPOINTMENT
} from "../actions/types";

const INITIAL_STATE = [
  {appointment_id: "A1", doctor_id: "D1", patient_id: "P1", appointment_datetime: "08032018 09:00:00"},
  {appointment_id: "A2", doctor_id: "D1", patient_id: "P1", appointment_datetime: "08042018 10:00:00"},
  {appointment_id: "A3", doctor_id: "D1", patient_id: "P2", appointment_datetime: "08032018 10:00:00"},
  {appointment_id: "A4", doctor_id: "D1", patient_id: "P1", appointment_datetime: "08042018 11:00:00"},
  {appointment_id: "A5", doctor_id: "D2", patient_id: "P1", appointment_datetime: "18032018 08:00:00"},
  {appointment_id: "A6", doctor_id: "D2", patient_id: "P1", appointment_datetime: "18042018 09:00:00"},
  {appointment_id: "A7", doctor_id: "D2", patient_id: "P3", appointment_datetime: "18032018 09:00:00"},
  {appointment_id: "A8", doctor_id: "D2", patient_id: "P3", appointment_datetime: "18042018 10:00:00"},
]

const appointmentReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_APPOINTMENT:
      return [...state]
    default:
      return [...state]
  }
}

export default appointmentReducer