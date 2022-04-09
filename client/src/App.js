import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointment from "./components/Appointment";
import AppointmentFix from "./components/AppointmentFix";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  return (
    <div className="app-container ui container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Header />}>
              <Route path="/main" element={<Main />} />
              <Route path="/fix-appointment" element={<AppointmentFix />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
