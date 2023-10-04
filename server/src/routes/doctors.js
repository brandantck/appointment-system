const express = require("express");
let router = express.Router();
const doctorController = require("../controller/doctor");

router.route("/").get(doctorController.getAllDoctors);

router.route("/:id").get(doctorController.getDoctorById);

module.exports = router;
