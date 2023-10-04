import { combineReducers } from "redux";

import authReducer from "./authReducer";
import doctorReducer from "./doctorReducer";
import patientReducer from "./patientReducer";
import appointmentReducer from "./appointmentReducer";

const appReducer = combineReducers({
  auth: authReducer,
  doctors: doctorReducer,
  patients: patientReducer,
  appointments: appointmentReducer,
});

// When user signs out, reset all redux state values
const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
