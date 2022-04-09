import { combineReducers } from 'redux';

import authReducer from './authReducer';
import appointmentReducer from './appointmentReducer';
import doctorReducer from './doctorReducer';
import patientReducer from './patientReducer';

export default combineReducers({
  auth: authReducer,
  appointments: appointmentReducer,
  doctors: doctorReducer,
  patients: patientReducer,
});