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
  
  getDoctorUniqueAppointmentDates(doctor_details) {
    const { id } = doctor_details
    return appointmentDAO.getDoctorUniqueAppointmentDates(id);
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

  getAvailableTimeslots(appointment_details) {
    const { doctor_id, patient_id, date } = appointment_details
    return appointmentDAO.getAvailableTimeslots(doctor_id, patient_id, date);
  }
}
module.exports = new AppointmentService();
