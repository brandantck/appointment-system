import React from "react";
import { connect } from 'react-redux';
import { signIn } from '../actions';

import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ patients, doctors, signIn }) => {

  let navigate = useNavigate();
  const onSubmit = (values) => {
    const allUsers = {...patients,...doctors}

    if (!(values.userId in allUsers)) {
      return { userId: "Unknown user ID" };
    }
    if (values.userName !== allUsers[values.userId]) {
      return { [FORM_ERROR]: "Wrong name" };
    }
    
    signIn(values.userId, values.userName)
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
                        <input {...input} type="text" placeholder="userId" />
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
                        <input
                          {...input}
                          type="text"
                          placeholder="userName"
                        />
                        {meta.error && meta.touched && (
                          <div className="ui error message">
                            {meta.error}
                          </div>
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
    doctors: state.doctors
  }
}


export default connect(
  mapStateToProps, {
    signIn
  }
)(Login);
