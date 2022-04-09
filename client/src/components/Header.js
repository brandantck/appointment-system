import React from "react";
import {
  Outlet,
} from 'react-router-dom';
import { connect } from "react-redux";

const Header = ({ userName }) => {
  return (
    <div>
      <h1 className="ui center teal aligned header">Appointment Booking System</h1>
      <h2 className="ui dividing header">Hello {userName}!</h2>
      <Outlet />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps)(Header);