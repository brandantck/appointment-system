import React, { useState, useEffect } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  fetchAvailableTimeslots,
  fixAppointment,
} from "../../actions/appointmentActions";

import moment from "moment";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AppointmentFix = ({
  userId,
  isDoctor,
  doctors,
  patients,
  availableTimeslots,
  fetchAvailableTimeslots,
  fixAppointment,
}) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedpatientId, setSelectedpatientId] = useState("");

  // Run when any form value changes
  const onFormValuesChange = (form, e) => {
    const { date, doctorId, patientId } = e.values;
    const dateStr = moment(date).format("yyyy-MM-DD");
    // If date value has changed, set state and reset time field in form
    if (selectedDate !== dateStr) {
      setSelectedDate(dateStr);
      form.change("time", null);
    }

    // If doctor_id has changed, set state and reset time field in form
    if (selectedDoctorId !== doctorId) {
      setSelectedDoctorId(doctorId);
      form.change("time", null);
    }

    // If patient_id has changed, set state and reset time field in form
    if (selectedpatientId !== patientId) {
      setSelectedpatientId(patientId);
      form.change("time", null);
    }
  };

  // If selected date, doctorId or patientId changes, send request to avaiable appointment timeslots.
  useEffect(() => {
    // Get all of the doctors appointments on that date and time
    if (selectedDoctorId && selectedpatientId && selectedDate) {
      fetchAvailableTimeslots({
        doctor_id: selectedDoctorId,
        patient_id: selectedpatientId,
        date: selectedDate,
      });
    }
  }, [
    selectedDate,
    selectedDoctorId,
    selectedpatientId,
    fetchAvailableTimeslots,
  ]);

  // Date picker adapter for react-final-form
  const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      showYearDropdown={true}
      scrollableYearDropdown={true}
      {...rest}
    />
    // minDate={new Date()}
  );

  // Create Action to fix appointment if all values in the form are filled
  const onSubmit = async (values) => {
    const { patientId, doctorId, date, time } = values;

    // If any values are not filled, return form error
    if (!(patientId && doctorId && date && time)) {
      return { [FORM_ERROR]: "Please fill in all the fields" };
    }

    // Convert datetime to date string
    const dateStr = moment(date).format("yyyy-MM-DD");
    try {
      await fixAppointment({
        doctor_id: doctorId,
        patient_id: patientId,
        date: dateStr,
        time: time,
      });
      navigate("/main");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  // Render doctorId options
  const doctorOptions = doctors.map((doctor) => {
    return (
      <option key={doctor.id} value={doctor.id}>
        {doctor.id}
      </option>
    );
  });
  // Render patientId options
  const patientOptions = patients.map((patient) => {
    return (
      <option key={patient.id} value={patient.id}>
        {patient.id}
      </option>
    );
  });
  // Render time options
  const timeOptions = availableTimeslots.map((timeslot) => {
    return (
      <option key={timeslot} value={timeslot}>
        {timeslot}
      </option>
    );
  });

  return (
    <div className="ui container">
      <h1 className="ui header">Fix a new appointment</h1>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          patientId: isDoctor ? "P1" : userId,
          doctorId: isDoctor ? userId : "D1",
          time: null,
        }}
        render={({ form, submitError, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="ui large form error ">
            <div className="ui stacked segment">
              <div className="field">
                <label>Doctor ID</label>
                <Field name="doctorId" component="select" disabled={isDoctor}>
                  {doctorOptions}
                </Field>
              </div>

              <div className="field">
                <label>Patient ID</label>
                <Field name="patientId" component="select" disabled={!isDoctor}>
                  {patientOptions}
                </Field>
              </div>

              <div className="field">
                <label>Date</label>
                <Field
                  name="date"
                  dateFormat="yyyy-MM-dd"
                  component={DatePickerAdapter}
                />
              </div>

              <div className="field">
                <label>Available time slots</label>
                <Field name="time" component="select">
                  {availableTimeslots.length ? (
                    <option hidden value={null}>
                      Pick a time
                    </option>
                  ) : (
                    <option hidden value={null}>
                      No timeslots available, select another date
                    </option>
                  )}
                  {timeOptions}
                </Field>
              </div>

              <FormSpy
                subscription={{ values: true, active: true }}
                onChange={(e) => onFormValuesChange(form, e)}
              />

              {submitError && (
                <div className="ui error message">{submitError}</div>
              )}
              <div className="ui grid two column">
                <div className="column four wide">
                  <Link to="/main">
                    <button className="ui fluid large yellow button">
                      back
                    </button>
                  </Link>
                </div>
                <div className="column twelve wide">
                  <button
                    type="submit"
                    className="ui fluid large blue submit button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    isDoctor: state.auth.isDoctor,
    doctors: state.doctors,
    patients: state.patients,
    availableTimeslots: state.appointments.availableTimeslots,
  };
};

export default connect(mapStateToProps, {
  fetchAvailableTimeslots,
  fixAppointment,
})(AppointmentFix);
