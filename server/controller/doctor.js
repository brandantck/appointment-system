const doctorService = require("../service/doctor")

class DoctorController {
  async getAllDoctors(req, res) {
    const response = await doctorService.getAllDoctors();
    res.send(response);
  }
  
  async getDoctorById(req, res) {
    const response = await doctorService.getDoctorById(req.params);
    res.send(response);
  }

}
module.exports = new DoctorController();