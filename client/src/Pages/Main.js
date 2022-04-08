import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import server from "../apis/server";

import Table from "../components/Table";

import { incrementCounter, decrementCounter } from "../actions";
import Appointment from "../components/Appointment";

const Main = ({
  isSignedIn,
  userId,
  isDoctor,
  patients,
  doctors,
  appointments,
}) => {
  const sendReq = async () => {
    const response = await server.get("/");

    console.log(response);
  };

  console.log(appointments);
  const renderAppointments = appointments.map((appointment) => {
    return <Appointment {...appointment} />;
  });

  return (
    <div className="row">
      <div className="eight wide column">
        <div className="ui header">Main</div>
        <div className="ui dividing header">Welcome {userId}!</div>
        <div className="row">
          <div className="ui padded stackable three column grid">
            <div className="ui cards">{renderAppointments}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    isDoctor: state.auth.isDoctor,
    patients: state.patients,
    doctors: state.doctors,
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps, {})(Main);
