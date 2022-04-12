const _ = require('lodash')

const appointmentDAO = require("../dao/appointment");

class AppointmentService {

  getAllAppointments() {
    return appointmentDAO.getAllAppointments();
  }
  
  getDoctorAppointments(doctor_details) {
    const { id } = doctor_details
    return appointmentDAO.getDoctorAppointments(id);
  }
  
  getDoctorAppointmentsByDate(appointment_details) {
    const { id, date } = appointment_details
    return appointmentDAO.getDoctorAppointmentsByDate(id, date);
  }
  
  async getDoctorUniqueAppointmentDates(doctor_details) {
    const { id } = doctor_details
    const response = await appointmentDAO.getDoctorUniqueAppointmentDates(id);

    const dates = _.uniq(_.map(response, "date"))
    
    return dates
  }
  
  getPatientAppointments(patient_details) {
    const { id } = patient_details
    return appointmentDAO.getPatientAppointments(id);
  }
  
  fixAppointment(appointment_details) {
    const { doctor_id, patient_id, date, time } = appointment_details
    return appointmentDAO.fixAppointment(doctor_id, patient_id, date, time);
  }

  cancelAppointment(appointment_details) {
    const { doctor_id, patient_id, date, time } = appointment_details

    return appointmentDAO.cancelAppointment(doctor_id, patient_id, date, time);
  }

  async getAvailableTimeslots(appointment_details) {
    const { doctor_id, patient_id, date } = appointment_details
    const response = await appointmentDAO.getAvailableTimeslots(doctor_id, patient_id, date);

    const defaultAppointmentTimeSlots = [
      "08:00:00",
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
    ]

    // From array of doctor's and patient's appointments on that particular date, extract out all the timeslots
    const takenTimeSlots = _.map(response, "time")
    // Get difference between default appointment timeslots and currently taken up timeslots
    const availableTimeSlots = _.differenceWith(defaultAppointmentTimeSlots, takenTimeSlots, _.isEqual)

    return availableTimeSlots
  }
}
module.exports = new AppointmentService();
