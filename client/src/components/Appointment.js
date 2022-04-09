import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
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
  const patientDetails = _.find(patients, { id: patient_id })

  // Get name based on whether current user is a doctor or not, show doctor name if current user is patient, show patient name if current user is doctor.
  const name = isDoctor ? (_.find(patients, { id: patient_id })).name : (_.find(doctors, { id: doctor_id })).name

  return (
    <div className="ui teal secondary segment">
      <div className="item">
        <AppointmentCancel doctor_id={doctor_id} patient_id={patient_id} date={date} time={time} />
        <div className="content">
          <h3 className="ui teal header"> ApptID: {id}</h3>
          <div>
            <span className="ui grey header">Date and time: {date}, {time}</span>
          </div>
          <div>
            <h5 className="ui header">
              Appointment with {name}
              {isDoctor &&
                <div>
                  Age: {patientDetails.age} | Gender: {patientDetails.gender}
                </div>
              }
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

{/* <div class="ui relaxed divided list">
  <div class="item">
    <div class="content">
      <a class="header">Semantic-Org/Semantic-UI</a>
      <div class="description">Updated 10 mins ago</div>
    </div>
  </div>
</div> */}
const mapStateToProps = (state) => {
  return {
    patients: state.patients,
    doctors: state.doctors,
    isDoctor: state.auth.isDoctor,
  };
};

export default connect(mapStateToProps, {
})(Appointment);



/*

    <div className="card">
      <div className="content">
        <div className="header">Appt ID: {appointment_id}</div>
        <div className="description">Date: {appointment_datetime}</div>
      </div>
      <div className="extra content">
        <div className="ui two column grid">
          <div className="column">
            <div className="header">{doctor_id}</div>
            <div className="meta">Doctor: {doctors[doctor_id]}</div>
          </div>
          <div className="column">
            <div className="header">{patient_id}</div>
            <div className="meta">Patient: {patients[patient_id]}</div>
          </div>
        </div>
      </div>
    </div>
*/