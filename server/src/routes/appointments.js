const express = require("express");
let router = express.Router();

const appointmentController = require("../controller/appointment");

router
  .route("/")
  // Get all appointments
  .get(appointmentController.getAllAppointments)
  // Fix appointment
  .post(appointmentController.fixAppointment)
  // Cancel appointment
  .delete(appointmentController.cancelAppointment);

// Get all appointments by doctor_id
router.route("/doctor/:id").get(appointmentController.getDoctorAppointments);

// Get all appointments by patient_id
router.route("/patient/:id").get(appointmentController.getPatientAppointments);

// Get all appointments by date and doctor id
router
  .route("/doctor/:id/date/:date")
  .get(appointmentController.getDoctorAppointmentsByDate);

// Get all unique appointment dates that a doctor has
router
  .route("/dates/doctor/:id/")
  .get(appointmentController.getDoctorUniqueAppointmentDates);

// Get available timeslot based on doctor_id, patient_id and date, to get both available timeslots based on both doctor's and patient's appointments
router
  .route("/available-timeslots")
  .post(appointmentController.getAvailableTimeslots);

module.exports = router;
