import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

  const [ selectedDate, setSelectedDate ] = useState(null);
  // On initial render, fetch all appointments from database
  useEffect(() => {
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
      <div className="ui container">
        <div className="ui grid ">
          <div className="left floated four wide column">
            <h1 className="ui header">Appointments </h1>
          </div>
          <div className="right floated four wide column">
            <Link to="/fix-appointment">
              <button className="ui button primary right floated">Fix Appointment</button>
            </Link>
          </div>
        </div>
        {appointments.length == 0 &&
          <div className="ui segment yellow inverted">
            <h3 className="ui center aligned header">You have no appointments</h3>
          </div>
        }
        <div className="ui relaxed divided items">{renderAppointments}</div>
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
