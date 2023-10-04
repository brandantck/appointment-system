const patientService = require("../service/patient");

class PatientController {
  async getAllPatients(req, res) {
    const response = await patientService.getAllPatients();
    res.send(response);
  }

  async getPatientById(req, res) {
    const response = await patientService.getPatientById(req.params);
    res.send(response);
  }
}

module.exports = new PatientController();
