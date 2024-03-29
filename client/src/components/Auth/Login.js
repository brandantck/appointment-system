import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

import { signIn, fetchAllUsers, authDoctor } from "../../actions";
import "./Login.css";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Login = ({ patients, doctors, signIn, fetchAllUsers, authDoctor }) => {
  const navigate = useNavigate();

  // Fetch all doctors and patients from database
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const onSubmit = (values) => {
    let allUsers = _.keyBy([...doctors, ...patients], "id");

    // If userId does not match
    if (!(values.userId in allUsers)) {
      return { userId: "Unknown user ID" };
    }
    // If name does not match userId
    if (values.userName !== allUsers[values.userId].name) {
      return { [FORM_ERROR]: "Wrong name" };
    }

    // If user is in doctor table, set isDoctor to true
    if (_.find(doctors, { id: values.userId })) {
      authDoctor();
    }

    signIn(values.userId, values.userName);
    toast("Login Success!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
    navigate("/main");
  };

  const validate = (values) => {
    const errors = {};
    if (!values.userId) {
      errors.userId = "Required";
    }
    if (!values.userName) {
      errors.userName = "Required";
    }
    return errors;
  };
  return (
    <div id="login-container" className="ui middle aligned center aligned grid">
      <div className="eight wide column">
        <h2 className="ui blue image header">
          <div className="content">Login to your account</div>
        </h2>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ submitError, handleSubmit, values }) => (
            <form onSubmit={handleSubmit} className="ui large form error ">
              <div className="ui stacked segment">
                <div className="field">
                  <label>User ID</label>
                  <Field name="userId">
                    {({ input, meta }) => (
                      <>
                        <input {...input} type="text" placeholder="User ID" />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <div className="ui error message">
                            {meta.error || meta.submitError}
                          </div>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                <div className="field">
                  <label>Name</label>
                  <Field name="userName">
                    {({ input, meta }) => (
                      <>
                        <input {...input} type="text" placeholder="Name" />
                        {meta.error && meta.touched && (
                          <div className="ui error message">{meta.error}</div>
                        )}
                      </>
                    )}
                  </Field>
                </div>
                {submitError && (
                  <div className="ui error message">{submitError}</div>
                )}
                <button
                  type="submit"
                  className="ui fluid large blue submit button"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
    doctors: state.doctors,
  };
};

export default connect(mapStateToProps, {
  signIn,
  fetchAllUsers,
  authDoctor,
})(Login);
