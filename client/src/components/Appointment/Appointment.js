import React from "react";
import { connect } from "react-redux";
import _ from 'lodash';

import AppointmentCancel from "./AppointmentCancel";

const Appointment = ({
  id,
  doctor_id,
  patient_id,
  date,
  time,
  patients,
  doctors,
  isDoctor
}) => {

  // Get patient details from patient_id
  const patientDetails = _.find(patients, { id: patient_id })

  // Get name based on whether current user is a doctor or not, show doctor name if current user is patient, show patient name if current user is doctor.
  const name = isDoctor ? (_.find(patients, { id: patient_id })).name : (_.find(doctors, { id: doctor_id })).name

  return (
    <div className="ui teal raised secondary segment">
      <div className="ui grid two column">
        <div className="column twelve wide">
          <div className="content">
            <h3 className="ui teal header"> ApptID: {id}</h3>
            <div>
              <span className="ui grey header">Date and time: {date}, {time}</span>
            </div>
            <div>
              <div className="ui divider"></div>
              <span className="ui header">
                Appointment with {name}
                {isDoctor &&
                  <div>
                    Age: {patientDetails.age} | Gender: {patientDetails.gender}
                  </div>
                }
              </span>
            </div>
          </div>
        </div>
        <div className="column four wide">
          <div className="ui grid">
            <div className="row">
              <div className="column right aligned">
                <AppointmentCancel doctor_id={doctor_id} patient_id={patient_id} date={date} time={time} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
    doctors: state.doctors,
    isDoctor: state.auth.isDoctor,
  };
};

export default connect(mapStateToProps, {
})(Appointment);
