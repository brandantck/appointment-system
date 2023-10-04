const db = require("../db/db");

class DoctorDAO {
  async getAllDoctors() {
    const response = await db("doctors").select("*");
    return response;
  }

  async getDoctorById(id) {
    const response = await db("doctors").where({ id: id });
    return response;
  }
}

module.exports = new DoctorDAO();
