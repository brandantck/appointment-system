import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import server from "../apis/server";

import Table from "../components/Table";

import { fetchPatientAppointments, fetchDoctorAppointments } from "../actions";
import Appointment from "../components/Appointment";

const Main = ({
  userName,
  userId,
  isDoctor,
  patients,
  doctors,
  appointments,
  fetchPatientAppointments,
  fetchDoctorAppointments
}) => {
  // On initial render, fetch all appointments from database
  useEffect(() => {
    if (isDoctor) {
      fetchDoctorAppointments(userId)
    } else {
      fetchPatientAppointments(userId)
    }
  }, [])

  
  const renderAppointments = appointments.map((appointment) => {
    return <Appointment {...appointment} />;
  });

  return (
    <>
      <h1 className="ui center aligned header">Main</h1>
      <div className="row">
        <div className="eight wide column">
          <div className="ui dividing header">Welcome {userName}!</div>
          <button class="ui button green right floated center aligned"></button>
          {/* <div className="ui two column grid"></div> */}
          <div className="ui center aligned header">Appointments </div>
          <div className="row">
            <div className="ui container">
              <div className="ui relaxed divided items">{renderAppointments}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    userName: state.auth.userName,
    isDoctor: state.auth.isDoctor,
    patients: state.patients,
    doctors: state.doctors,
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps, {
  fetchPatientAppointments,
  fetchDoctorAppointments
})(Main);
