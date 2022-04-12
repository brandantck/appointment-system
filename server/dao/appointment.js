const db = require('../db/db')
const _ = require('lodash')

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
    const dates = _.uniq(_.map(response, "date"))
    return dates
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

    const response = await db('appointments').where({ patient_id: patient_id, date: date }).orWhere({ doctor_id: doctor_id, date: date }).returning('time')

    // From array of doctor's and patient's appointments on that particular date, extract out all the timeslots
    const takenTimeSlots = _.map(response, "time")
    // Get difference between default appointment timeslots and currently taken up timeslots
    const availableTimeSlots = _.differenceWith(defaultAppointmentTimeSlots, takenTimeSlots, _.isEqual)

    return availableTimeSlots
  }
}
module.exports = new AppointmentDAO(); 