import server from "../apis/server"
import {
  FETCH_APPOINTMENTS,
  CANCEL_APPOINTMENT
} from './types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

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
    
    toast.info("Successfully cancelled appointment",
      { position: toast.POSITION.TOP_CENTER, autoClose: 750 });

  } else {
    console.log("Fail to cancel appointment")
  }
}