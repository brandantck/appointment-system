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
      <h1 className="ui center teal aligned header">Appointment Booking System</h1>
      <div className="row">
        <div className="eight wide column">
          <h2 className="ui dividing header">Welcome {userName}!</h2>
          <div className="ui container">
            <div className="ui grid ">
              <div className="left floated four wide column">
                <h1 className="ui header">Appointments </h1>
              </div>
              <div className="right floated four wide column">
                <button class="ui button primary right floated">Fix Appointment</button>
              </div>
            </div>
            {appointments.length == 0 && 
            <div className="ui segment yellow inverted">
              <h3 className="ui center aligned header">You have no appointments</h3>
            </div>
            }
            <div className="ui relaxed divided items">{renderAppointments}</div>
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
