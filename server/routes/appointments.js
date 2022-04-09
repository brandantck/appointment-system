const express = require("express");
let router = express.Router();
const db = require('../db')
const _ = require('lodash')

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

// Get all appointments
router.route("/")
  .get(async (req, res) => {
    const response = await db('appointments').select("*")
    res.send(response)
  })
  // Fix appointment
  .post(async (req, res) => {
    const { doctor_id, patient_id, date, time } = req.body
    const response = await db('appointments').insert({ doctor_id: doctor_id, patient_id: patient_id, date: date, time: time })

    const { rowCount } = response
    if (rowCount == 0) {
      res.status(400).send("Failed to fix appointment")
    }

    res.send({ rowCount })
  })
  // Cancel appointment
  .delete(async (req, res) => {
    const { doctor_id, patient_id, date, time } = req.body
    const response = await db('appointments').where({ doctor_id: doctor_id, patient_id: patient_id, date: date, time: time }).del().returning("id")

    if (response.length == 0) {
      res.status(400).send("Failed to delete appointment")
    }

    // Return appointment id of row that was deleted
    res.send({ id: response[0].id })
  })

// Get all appointments by doctor_id
router.route("/doctor/:id")
  .get(async (req, res) => {
    const id = req.params.id
    const response = await db('appointments').where({ doctor_id: id })
    res.send(response)
  })

// Get all appointments by patient_id
router.route("/patient/:id")
  .get(async (req, res) => {
    const id = req.params.id
    const response = await db('appointments').where({ patient_id: id })
    res.send(response)
  })

// Get all appointments by date and doctor id
router.route("/doctor/:id/date/:date")
  .get(async (req, res) => {
    const { id, date } = req.params
    const response = await db('appointments').where({ doctor_id: id, date: date })
    res.send(response)
  })

// Get available timeslot based on doctor_id, patient_id and date, to get both available timeslots based on both doctor's and patient's appointments
router.route("/available-timeslots")
  .post(async (req, res) => {
    const { doctor_id, patient_id, date } = req.body
    const response = await db('appointments').where({patient_id: patient_id, date: date}).orWhere({doctor_id: doctor_id, date: date}).returning('time')
    
    // From array of doctor's and patient's appointments on that particular date, extract out all the timeslots
    const takenTimeSlots = _.map(response, "time")

    // Get difference between default doctor timeslots and currently taken up timeslots
    const availableTimeSlots = _.differenceWith(defaultAppointmentTimeSlots, takenTimeSlots, _.isEqual)

    res.send(availableTimeSlots)

  })

module.exports = router;