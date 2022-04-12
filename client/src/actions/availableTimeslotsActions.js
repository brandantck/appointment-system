import server from "../apis/server"
import {
  FETCH_AVAILABLE_TIMESLOTS,
} from './types';


export const fetchAvailableTimeslots = ({ doctor_id, patient_id, date }) => async dispatch => {
  const response = await server.post("/appointments/available-timeslots", {
    doctor_id: doctor_id, patient_id: patient_id, date: date
  });

  dispatch({ type: FETCH_AVAILABLE_TIMESLOTS, payload: response.data });
}