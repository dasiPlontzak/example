import React from "react";
import { useSelector } from "react-redux";
import { subscribe } from "../../../services/Subscribe.service";
import "./SubscribeForm.css";
import { Formik, Form, Field } from "formik";
import { connect } from 'react-redux';

function SubscribeForm(props) {
    const fieldSubscription = useSelector(state => state.editSubscription)
    let username = "leader";
    let subject = `Welcome to `;
    const body = `<h3>We are happy to serve you, Hope you enjoyed</h3>`;

    const validate = values => {
        const errors = {};
        if (!values.fullName) {
            if (fieldSubscription.name)
                errors.fullName = 'Name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.phone) {
            if (fieldSubscription.phone)
                errors.phone = 'Phone is required';
        } else if (!/^$|^\d{10}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number'
        }
        if (!values.adress) {
            if (fieldSubscription.adress)
                errors.adress = 'Adress is required';
        }
        return errors;
    };

    const handleSubscribe = (values) => {
        if (!fieldSubscription.name) {
            subject = "Welcome"
            values.fullName = ''
        }
        subscribe(subject + values.fullName, body, values.email, username);

    };

    const changeBorder = (e) => {
        e.target.style.border = `${props.mainColor} 1.5px solid`
    }

    const cancelBorder = (e) => {
        e.currentTarget.style.border = ''
    }

    return (
        <div className="SubscribeForm SubscribeFormColor">
            <div className="Subwidth d-flex justify-content-center align-item-center ">
                {/* <h6 className="SubscribeFormP">Stay Tuned!</h6> */}
                <Formik
                    initialValues={{
                        email: "",
                        fullName: "",
                        phone: "",
                        adress: ""
                    }}
                    onSubmit={handleSubscribe}
                    validate={validate}
                >
                    {({ errors, touched, values, handleChange, isValid, isSubmitting, dirty }) => (
                        <Form className="Subwidth d-flex justify-content-start ">
                            <Field
                                name="fullName"
                                type="text"
                                className="SubscribeFormInput"
                                placeholder={touched.fullName && errors.fullName ? errors.fullName : "Full Name"}
                                value={values.fullName}
                                onChange={handleChange}
                                hidden={!fieldSubscription.name}
                                onMouseOver={changeBorder}
                                onMouseLeave={cancelBorder}
                            />
                            <Field
                                name="email"
                                type="email"
                                className="SubscribeFormInput"
                                placeholder={touched.email && errors.email ? errors.email : "Email"}
                                style={{
                                    color: errors.email == "Invalid email address" ?
                                        "red" : "#343a40"
                                }}
                                value={values.email}
                                onChange={handleChange}
                                onMouseOver={changeBorder}
                                onMouseLeave={cancelBorder}
                            />
                            <Field
                                name="phone"
                                type="phone"
                                className="SubscribeFormInput"
                                placeholder={touched.phone && errors.phone ? errors.phone : "Phone"}
                                style={{
                                    color: errors.phone == "Invalid phone number" ?
                                        "red" : "#343a40"
                                }}
                                value={values.phone}
                                onChange={handleChange}
                                hidden={!fieldSubscription.phone}
                                onKeyPress={(e) => {
                                    if (e.charCode < 48 || e.charCode > 57 || e.target.value.length >= 10)
                                        e.preventDefault()
                                }
                                }
                                onMouseOver={changeBorder}
                                onMouseLeave={cancelBorder}
                            />
                            <Field
                                name="adress"
                                type="text"
                                className="SubscribeFormInput"
                                placeholder={touched.adress && errors.adress ? errors.adress : "Adress"}
                                value={values.adress}
                                onChange={handleChange}
                                hidden={!fieldSubscription.adress}
                                onMouseOver={changeBorder}
                                onMouseLeave={cancelBorder}
                            />
                            <button
                                className="SubscribeFormButton"
                                type="submit"
                                disabled={!dirty || !isValid}
                                style={{ backgroundColor: props.mainColor, opacity: !dirty || !isValid ? '0.7' : '1' }}
                            >
                                <h6>Subscribe</h6>
                            </button>
                            {/* <span className="errorMessage d-flex justify-content-center align-items-center ">
                                {touched.fullName && errors.fullName
                                    ? errors.fullName
                                    : errors.email && touched.email
                                        ? errors.email
                                        : null}
                            </span> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        mainColor: state.channelSettings.mainColor
    }
}

export default connect(mapStateToProps)(SubscribeForm);