import server from "../apis/server";
import {
  FETCH_APPOINTMENTS,
  FIX_APPOINTMENT,
  CANCEL_APPOINTMENT,
  FETCH_AVAILABLE_TIMESLOTS,
} from "./types";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

// Fetch all appointments
export const fetchAppointments = () => async (dispatch) => {
  const response = await server.get("/appointments/");
  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
};

// Fetch all all appointments by patient_id
export const fetchPatientAppointments = (userId) => async (dispatch) => {
  const response = await server.get(`/appointments/patient/${userId}`);
  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
};

// Fetch all all appointments by doctor_id
export const fetchDoctorAppointments = (userId) => async (dispatch) => {
  const response = await server.get(`/appointments/doctor/${userId}`);
  dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
};

// Fetch all all appointments by doctor_id and date
export const fetchDoctorAppointmentsByDate =
  (userId, date) => async (dispatch) => {
    const response = await server.get(
      `/appointments/doctor/${userId}/date/${date}`,
    );
    dispatch({ type: FETCH_APPOINTMENTS, payload: response.data });
  };

// Fix appointment by doctor_id, patient_id, date, time
export const fixAppointment =
  ({ doctor_id, patient_id, date, time }) =>
  async (dispatch) => {
    try {
      const response = await server.post("/appointments/", {
        doctor_id,
        patient_id,
        date,
        time,
      });

      if (response.status === 200) {
        toast.success("Successfully fixed appointment", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        dispatch({
          type: FIX_APPOINTMENT,
          payload: {
            id: response.id,
            doctor_id,
            patient_id,
            date,
            time,
          },
        });
      }
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

// Cancel appointment by doctor_id, patient_id, date, time
export const cancelAppointment =
  (doctor_id, patient_id, date, time) => async (dispatch) => {
    try {
      const response = await server.delete("/appointments/", {
        data: {
          doctor_id,
          patient_id,
          date,
          time,
        },
      });

      if (response.status === 200) {
        dispatch({ type: CANCEL_APPOINTMENT, payload: response.data.id });
        toast.info("Successfully cancelled appointment", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 750,
        });
      }
    } catch (error) {
      toast.error(error.response.data, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

// Fetch all available timeslots based on doctor_id, patient_id, date
export const fetchAvailableTimeslots =
  ({ doctor_id, patient_id, date }) =>
  async (dispatch) => {
    const response = await server.post("/appointments/available-timeslots", {
      doctor_id: doctor_id,
      patient_id: patient_id,
      date: date,
    });

    dispatch({ type: FETCH_AVAILABLE_TIMESLOTS, payload: response.data });
  };
