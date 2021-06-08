import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import './OnBoarding.css'

export default function WhoAreYou(props) {
  const { errors, values, handleChange, handleBlur, isValid, touched } = props;
  return (
    <div>
      <div className="WhoAreYou">
        <h4>About you</h4>
        <div className="WhoAreYouDiv">
        <br/>
          <div className="d-flex justify-content-center WhoAreYouDiv ">  
          <TextField
            id="outlined-search"
            type="search"
            variant="outlined"
            className="OnBoardingTextField"
            required
            placeholder="Name"
            onChange={handleChange}
            value={values.adminName}
            onBlur={handleBlur}
          />
          {errors.adminName && touched.adminName ? errors.adminName : ''}
          </div>
          <div className="d-flex justify-content-center WhoAreYouDiv ">
          <TextField
            id="outlined-search"
            type="Email"
            variant="outlined"
            className="OnBoardingTextField"
            required="required"
            // required
            onChange={handleChange}
            defaultValue={values.adminEmail}
            onBlur={handleBlur}
          />
          {errors.adminName && touched.adminName ? errors.adminName : ''}
          </div>




        </div>
      </div>
    </div>
  );
}


