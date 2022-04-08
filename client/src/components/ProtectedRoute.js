import React from 'react';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { connect } from 'react-redux'

const ProtectedRoute = ({ children, isSignedIn }) => {
  return isSignedIn ? children : <Navigate to="/" replace />
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute);