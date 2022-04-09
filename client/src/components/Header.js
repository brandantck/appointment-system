import React from "react";
import {
  Outlet,
} from 'react-router-dom';
import { connect } from "react-redux";
import LogoutButton from "./LogoutButton";

const Header = ({ userName }) => {
  return (
    <>
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <h1 className="ui center aligned header teal">Appointment Booking System</h1>
          </div>
        </div>

        <div className="row">
          <div className="ui two column grid">
            <div className="column">
              <h2 className="ui header">Hello {userName}!</h2>
            </div>
            <div className="column right aligned">
              <LogoutButton />
            </div>
            <div className="ui divider"></div>
          </div>
        </div>

      </div>
      <Outlet />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps)(Header);