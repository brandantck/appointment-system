import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import server from "../../apis/server"

import _ from "lodash";

import { fetchDoctorAppointments, fetchDoctorAppointmentsByDate } from "../../actions";

const AppointmentDateDropdown = ({ doctorId, fetchDoctorAppointments, fetchDoctorAppointmentsByDate }) => {

  const [uniqueAppointmentDates, setUniqueAppointmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(async () => {
    const response = await server.get(`appointments/dates/doctor/${doctorId}`)
    setUniqueAppointmentDates(_.sortBy(response.data))
  }, [])

  useEffect(() => {
    if (!selectedDate) {
      return null
    }

    if (selectedDate == "all") {
      fetchDoctorAppointments(doctorId)
    } else {
      console.log(selectedDate)
      fetchDoctorAppointmentsByDate(doctorId, selectedDate)
    }
    
  }, [selectedDate])

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