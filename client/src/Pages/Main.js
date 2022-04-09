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

  const [selectedDate, setSelectedDate] = useState(null);
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
      <div className="ui stackable two column grid">
        <div className="column">
          <h2 className="ui header">Your Appointments</h2>
          <label>Filter </label>
          <select class="ui dropdown">
            <option value="all">Get all appointments</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </div>
        <div className="column right aligned">
          <Link to="/fix-appointment">
            <div class="ui blue circular animated button" tabindex="0">
              <div class="visible content">
                Fix Appointment
              </div>
              <div class="hidden content">
                <i class="right arrow icon"></i>
              </div>
            </div>
            {/* <div className="ui blue circular labeled icon button">
              Fix Appointment
              <i className="add icon"></i>
            </div> */}
            {/* <button className="ui button primary right floated"></button> */}
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
