import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPatientAppointments, fetchDoctorAppointments } from "../actions";
import Appointment from "./Appointment/Appointment";
import AppointmentDateDropdown from "./Appointment/AppointmentDateDropdown";

const Main = ({
  userId,
  isDoctor,
  appointments,

  fetchPatientAppointments,
  fetchDoctorAppointments
}) => {

  // On initial render, fetch all appointments from database
  useEffect(() => {
    // Redux
    if (isDoctor) {
      fetchDoctorAppointments(userId)
    } else {
      fetchPatientAppointments(userId)
    }
  }, [])

  const renderAppointments = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  return (
    <>
      <div className="ui stackable two column grid">
        <div className="column">
          <h2 className="ui header">Your Appointments</h2>
          {isDoctor && <AppointmentDateDropdown />}
        </div>
        <div className="column right aligned">
          <Link to="/fix-appointment">
            <div className="ui blue circular animated button" tabIndex="0">
              <div className="visible content">
                Fix Appointment
              </div>
              <div className="hidden content">
                <i className="right arrow icon"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {appointments.length == 0 &&
        <div className="ui segment yellow inverted">
          <h3 className="ui center aligned header">You have no appointments</h3>
        </div>
      }
      <div className="ui relaxed divided items">{renderAppointments}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    isDoctor: state.auth.isDoctor,
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps, {
  fetchPatientAppointments,
  fetchDoctorAppointments
})(Main);
