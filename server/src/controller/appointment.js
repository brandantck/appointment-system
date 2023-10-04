const appointmentService = require("../service/appointment");

class AppointmentController {
  async getAllAppointments(req, res) {
    const response = await appointmentService.getAllAppointments();
    res.send(response);
  }

  async getDoctorAppointments(req, res) {
    const response = await appointmentService.getDoctorAppointments(req.params);
    res.send(response);
  }

  async getDoctorAppointmentsByDate(req, res) {
    const response = await appointmentService.getDoctorAppointmentsByDate(
      req.params,
    );
    res.send(response);
  }

  async getDoctorUniqueAppointmentDates(req, res) {
    const dates = await appointmentService.getDoctorUniqueAppointmentDates(
      req.params,
    );
    res.send(dates);
  }

  async getPatientAppointments(req, res) {
    const response = await appointmentService.getPatientAppointments(
      req.params,
    );
    res.send(response);
  }

  async fixAppointment(req, res) {
    try {
      const id = await appointmentService.fixAppointment(req.body);
      res.send({ id });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("Unexpected error on server, Failed to fix appointment");
    }
  }

  async cancelAppointment(req, res) {
    try {
      const id = await appointmentService.cancelAppointment(req.body);
      res.send({ id });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("Unexpected error on server, Failed to cancel appointment");
    }
  }

  async getAvailableTimeslots(req, res) {
    const availableTimeSlots = await appointmentService.getAvailableTimeslots(
      req.body,
    );
    res.send(availableTimeSlots);
  }
}
module.exports = new AppointmentController();
