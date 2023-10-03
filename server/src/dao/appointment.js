const db = require('../db/db')

class AppointmentDAO {
  async getAllAppointments() {
    const response = await db('appointments').select("*")
    return response;
  }

  async getDoctorAppointments(id) {
    const response = await db('appointments').where({ doctor_id: id })
    return response
  }

  async getDoctorAppointmentsByDate(id, date) {
    const response = await db('appointments').where({ doctor_id: id, date: date })
    return response
  }

  async getDoctorUniqueAppointmentDates(id) {
    const response = await db('appointments').where({ doctor_id: id })
    return response
  }

  async getPatientAppointments(id) {
    const response = await db('appointments').where({ patient_id: id })
    return response
  }

  async fixAppointment(doctor_id, patient_id, date, time) {
    const [response] = await db('appointments').insert({ doctor_id: doctor_id, patient_id: patient_id, date: date, time: time }).returning("id")

    const { id } = response
    return id;
  }

  async cancelAppointment(doctor_id, patient_id, date, time) {
    const [response] = await db('appointments').where({ doctor_id: doctor_id, patient_id: patient_id, date: date, time: time }).del().returning("id")

    const { id } = response
    return id;
  }

  async getAvailableTimeslots(doctor_id, patient_id, date) {
    const response = await db('appointments').where({ patient_id: patient_id, date: date }).orWhere({ doctor_id: doctor_id, date: date }).returning('time')

    return response
  }
}
module.exports = new AppointmentDAO(); 