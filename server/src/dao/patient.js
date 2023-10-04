const db = require("../db/db");

class PatientDAO {
  async getAllPatients() {
    const response = await db("patients").select("*");
    return response;
  }

  async getPatientById(id) {
    const response = await db("patients").where({ id: id });
    return response;
  }
}

module.exports = new PatientDAO();
