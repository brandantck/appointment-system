const express = require("express");
let router = express.Router();
const patientController = require("../controller/patient");

router.route("/")
  .get(patientController.getAllPatients)

router.route("/:id")
  .get(patientController.getPatientById)
  
module.exports = router;