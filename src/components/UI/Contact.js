import React from "react";
//import * as Icons from "react-bootstrap-icons";
import {GoLocation } from 'react-icons/all';

export default function Contact(props) {
  return (
    <div className="wrapper m-5 p-4">
      <div
        className="contactus"
        style={{ backgroundImage: `url("../assets/img02.jpg")`}}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h2 className="title">Get in Touch</h2>
              <h4 className="description">
                You need more information? Check what other persons are saying
                about our product. They are very happy with their purchase.
              </h4>
              <div className="info info-horizontal">
                <div className="icon icon-primary">
                    <i><GoLocation/></i>
                  {/* <i className="now-ui-icons location_pin" /> */}
                </div>
                <div className="description">
                  <h4 className="info-title">Find us at the office</h4>
                  <p className="description">
                    {" "}
                    Bld Mihail Kogalniceanu, nr. 8,
                    <br /> 7652 Bucharest,
                    <br /> Romania
                  </p>
                </div>
              </div>
              <div className="info info-horizontal">
                <div className="icon icon-primary">
                  <i className="now-ui-icons tech_mobile" />
                </div>
                <div className="description">
                  <h4 className="info-title">Give us a ring</h4>
                  <p className="description">
                    {" "}
                    Michael Jordan
                    <br /> +40 762 321 762
                    <br /> Mon - Fri, 8:00-22:00
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-5 ml-auto mr-auto">
              <div className="card card-contact card-raised">
                <form id="contact-form1" method="post">
                  <div className="card-header text-center">
                    <h4 className="card-title">Contact Us</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 pr-2">
                        <label>First name</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="now-ui-icons users_circle-08" />
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name..."
                            aria-label="First Name..."
                            autoComplete="given-name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 pl-2">
                        <div className="form-group">
                          <label>Last name</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="now-ui-icons text_caps-small" />
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name..."
                              aria-label="Last Name..."
                              autoComplete="family-name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email address</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons ui-1_email-85" />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Here..."
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your message</label>
                      <textarea
                        name="message"
                        className="form-control"
                        id="message"
                        rows={6}
                        defaultValue={""}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                            <span className="form-check-sign" />
                            I'm not a robot
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn btn-primary btn-round pull-right"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
