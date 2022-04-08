import _ from 'lodash';
import server from "../apis/server"

import {
  SIGN_IN,
  SIGN_OUT,
  AUTH_DOCTOR,
  FETCH_DOCTORS,
  FETCH_PATIENTS,
  FETCH_APPOINTMENTS,
  CANCEL_APPOINTMENT
} from './types';

export const signIn = (userId, userName) => {
  return {
    type: SIGN_IN,
    payload: { userId, userName }
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const authDoctor = () => {
  return {
    type: AUTH_DOCTOR
  }
}

export const fetchAllUsers = () => async dispatch => {
  dispatch(fetchDoctors());
  dispatch(fetchPatients());
}

export const fetchDoctors = () => async dispatch => {
  const response = await server.get("/doctors/");

  dispatch({ type: FETCH_DOCTORS, payload: response.data });
}

export const fetchPatients = () => async dispatch => {
  const response = await server.get("/patients/");

  dispatch({ type: FETCH_PATIENTS, payload: response.data });
}

export const fetchAppointments = () => async dispatch => {
  const response = await server.get("/appointments/");

  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
}

export const fetchPatientAppointments = (userId) => async dispatch => {
  const response = await server.get(`/appointments/patient/${userId}`);

  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
}

export const fetchDoctorAppointments = (userId) => async dispatch => {
  const response = await server.get(`/appointments/doctor/${userId}`);

  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
}

export const cancelAppointment = (doctor_id, patient_id, date, time) => async dispatch => {
  const response = await server.delete("/appointments/", {
    data: {
      doctor_id, patient_id, date, time
    }
  });

  if (response.status === 200) {
    dispatch({ type: CANCEL_APPOINTMENT, payload: response.data.id });
  } else {
    console.log("Fail to cancel appointment")
  }
}