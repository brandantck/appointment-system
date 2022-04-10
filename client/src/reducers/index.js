import { combineReducers } from 'redux';

import authReducer from './authReducer';
import appointmentReducer from './appointmentReducer';
import doctorReducer from './doctorReducer';
import patientReducer from './patientReducer';

// export default combineReducers({
//   auth: authReducer,
//   appointments: appointmentReducer,
//   doctors: doctorReducer,
//   patients: patientReducer,
// });

const appReducer = combineReducers({
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    patients: patientReducer,
  });

// When user signs out, reset all redux state values
const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer