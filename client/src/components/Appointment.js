import React from "react";
import { connect } from "react-redux";

const Appointment = ({
  appointment_id,
  doctor_id,
  patient_id,
  appointment_datetime,
  patients,
  doctors,
}) => {
  return (
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
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
    doctors: state.doctors,
  };
};

export default connect(mapStateToProps)(Appointment);
