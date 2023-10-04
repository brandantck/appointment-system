const patientDAO = require("../dao/patient");

class PatientService {
  getAllPatients() {
    return patientDAO.getAllPatients();
  }

  getPatientById(patient_details) {
    const { id } = patient_details;
    return patientDAO.getPatientById(id);
  }
}

module.exports = new PatientService();
