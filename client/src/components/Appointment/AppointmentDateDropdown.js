import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import server from "../../apis/server"

import _ from "lodash";

import { fetchDoctorAppointments, fetchDoctorAppointmentsByDate } from "../../actions";

const AppointmentDateDropdown = ({ doctorId, fetchDoctorAppointments, fetchDoctorAppointmentsByDate }) => {

  const [uniqueAppointmentDates, setUniqueAppointmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const fetchDates = useCallback(async () => {
    const response = await server.get(`appointments/dates/doctor/${doctorId}`)
    setUniqueAppointmentDates(_.sortBy(response.data))
  }, [doctorId])

  // Get unique list of doctor appointment dates and sort by date
  useEffect(() => {
    fetchDates()
  }, [fetchDates])

  // Fetch and update appointments state based on selection made in date dropdown
  useEffect(() => {
    if (!selectedDate) {
      return null
    }

    if (selectedDate === "all") {
      fetchDoctorAppointments(doctorId)
    } else {
      fetchDoctorAppointmentsByDate(doctorId, selectedDate)
    }

  }, [doctorId, selectedDate, fetchDoctorAppointments, fetchDoctorAppointmentsByDate])

  return (
    <>
      <label>Get by: </label>
      <select className="ui dropdown" onChange={(e) => { setSelectedDate(e.target.value) }} value={selectedDate}>
        <option value="all">All Appointments</option>
        {uniqueAppointmentDates.map(appointmentDate => {
          return (
            <option key={appointmentDate} value={appointmentDate}>{appointmentDate}</option>
          )
        })}
      </select>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    doctorId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  fetchDoctorAppointments,
  fetchDoctorAppointmentsByDate
})(AppointmentDateDropdown)