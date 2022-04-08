const express = require("express");
let router = express.Router();
const db = require('../db')

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

    const {rowCount} = response
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
    res.send({id: response[0].id})
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

module.exports = router;