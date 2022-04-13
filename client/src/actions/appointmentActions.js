import server from "../apis/server"
import {
  FETCH_APPOINTMENTS,
  CANCEL_APPOINTMENT,
  FETCH_AVAILABLE_TIMESLOTS,
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

export const fetchDoctorAppointmentsByDate = (userId, date) => async dispatch => {
  const response = await server.get(`/appointments/doctor/${userId}/date/${date}`);

  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
}

export const cancelAppointment = (doctor_id, patient_id, date, time) => async dispatch => {
  try {
    const response = await server.delete("/appointments/", {
      data: {
        doctor_id, patient_id, date, time
      }
    });

    if (response.status === 200) {
      dispatch({ type: CANCEL_APPOINTMENT, payload: response.data.id });
      toast.info("Successfully cancelled appointment",
        { position: toast.POSITION.TOP_CENTER, autoClose: 750 });
    }
  } catch (error) {
    toast.error(error.response.data, { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
  }
}

export const fetchAvailableTimeslots = ({ doctor_id, patient_id, date }) => async dispatch => {
  const response = await server.post("/appointments/available-timeslots", {
    doctor_id: doctor_id, patient_id: patient_id, date: date
  });

  dispatch({ type: FETCH_AVAILABLE_TIMESLOTS, payload: response.data });
}