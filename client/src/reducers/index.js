
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import appointmentReducer from './appointmentReducer';
import doctorReducer from './doctorReducer';
import patientReducer from './patientReducer';

export default combineReducers({
  auth: authReducer,
  counter: counterReducer,
  appointments: appointmentReducer,
  doctors: doctorReducer,
  patients: patientReducer,
});