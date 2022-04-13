import server from "../apis/server"

import {
  FETCH_DOCTORS,
  FETCH_PATIENTS,
} from './types';

export const fetchAllUsers = () => async dispatch => {
  dispatch(fetchDoctors());
  dispatch(fetchPatients());
}

// Fetch all doctors
export const fetchDoctors = () => async dispatch => {
  const response = await server.get("/doctors/");
  dispatch({ type: FETCH_DOCTORS, payload: response.data });
}

// Fetch all patients
export const fetchPatients = () => async dispatch => {
  const response = await server.get("/patients/");
  dispatch({ type: FETCH_PATIENTS, payload: response.data });
}