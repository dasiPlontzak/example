import React, { useState } from "react";
import { useSelector } from "react-redux";
import { subscribe } from "../../../../services/Subscribe.service";
import Marketing from "../../../../assets/EmailMarketing.svg";
import { Email, Height, Phone } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import "./SubScriber.css";

export default () => {

  const validate = values => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };
  const fieldSubscription = useSelector(state => state.editSubscription)

  var username = "leader";
  const subject = `Welcome to `;
  const body = `<h3>We are happy to serve you, Hope you enjoyed</h3>`;

  const handleSubscribe = (values) => {
    console.log("handleSubscribe ", values);
    subscribe(subject + values.fullName, body, values.email, username);
  };

  return (
    <>
      {/*  style={{ width: '70%'}}  */}
      <div className="modal-body" >
        <div style={{ textAlign: "center" }} >
          <img src={Marketing} style={{ width: '100px', marginBottom: '10px' }} />
          <br /><br />
          <h6>Enter your details and the podcast <br></br>is on the way to you!</h6>
          <br />
          <div className="d-flex  justify-content-center">
              <div className="d-flex flex-column justify-content-center">
                <Formik
                  initialValues={{
                    email: '',
                    fullName: ''
                  }}
                  onSubmit={handleSubscribe}
                  validate={validate}>
                  {({ errors, touched, values, handleChange, isValid, dirty }) => (
                    <Form>
                      <Field
                        name="fullName"
                        type="text"
                        className="SubScriberInputn"
                        placeholder="Full Name"
                        value={values.fullName}
                        onChange={handleChange}
                        hidden={!fieldSubscription.name}
                      />
                      <Field
                        name="email"
                        type="email"
                        className="SubScriberInputn"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        hidden={!fieldSubscription.email}
                      />
                      <Field
                        name="phone"
                        type="phone"
                        className="SubScriberInputn"
                        placeholder="Phone"
                        onChange={handleChange}
                        hidden={!fieldSubscription.phone}

                      />
                      <Field
                        name="adress"
                        type="text"
                        className="SubScriberInputn"
                        placeholder="Adress"
                        onChange={handleChange}
                        hidden={!fieldSubscription.adress}

                      />
                      <button
                        className="SubScriberButton"
                        type="submit"
                        disabled={!dirty || !isValid}
                        style={{ backgroundColor: !dirty || !isValid ? '#8555a9' : '' }}
                      >
                        Send me!
                    </button>
                      <span 
                        // className="errorMessage d-flex justify-content-center align-items-center "
                      >
                        {errors.fullName && touched.fullName
                          ? errors.fullName
                          : errors.email && touched.email
                            ? errors.email
                            : null}
                      </span>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

