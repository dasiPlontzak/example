import React from "react";
import TextField from '@material-ui/core/TextField';
import './OnBoarding.css'
import UploadImageLogin from './uploadImageLogin'

export default function ChannelName(props) {
  const { errors, values, handleChange, handleBlur, isValid, touched } = props;
  return (
    <div>
      <div className=" d-flex justify-content-center align-item-center">
        <div className="d-flex flex-column">
          <div className="p-2"><h4>About Your company</h4></div>
          <div className="p-2">
            <TextField
              id="outlined-search"
              name="channelName"
              label="Brand name"
              placeholder="Brand name"
              type="text"
              variant="outlined"
              className="OnBoardingTextField"
              required="required"
              value={values.channelName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.channelName && touched.channelName ? errors.channelName : ''}
          </div>
          <div className="p-2 BrandnameDiv  d-flex justify-content-center align-items-center">
            <div >
              <UploadImageLogin kind={'channelImage'} />
            </div>
          </div>
          {/* <div className="p-2"></div> */}
        </div>
      </div>
    </div>
  );
}
