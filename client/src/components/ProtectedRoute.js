import React from 'react';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import { connect } from 'react-redux'

const ProtectedRoute = ({ children, isSignedIn }) => {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute);