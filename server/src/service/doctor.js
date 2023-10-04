const doctorDAO = require("../dao/doctor");

class DoctorService {
  getAllDoctors() {
    return doctorDAO.getAllDoctors();
  }

  getDoctorById(doctor_details) {
    const { id } = doctor_details;
    return doctorDAO.getDoctorById(id);
  }
}

module.exports = new DoctorService();
