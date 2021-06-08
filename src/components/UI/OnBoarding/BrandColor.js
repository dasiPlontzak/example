import React from "react";
import { actions } from '../../../redux/actions';
import { connect } from 'react-redux';
import { GithubPicker } from 'react-color';


function BrandColor(props) {
  const { errors, values, handleChange, handleBlur, isValid, touched } = props;
  let color = ['#CCCCCC', '#44D7B6', '#6DD41F', '#BFD41F', '#F0D923', '#F8B520', '#F88C20', '#40D9ED', '#3598F4', '#8580FD', '#6236FC', '#B620E0', '#F13B7F', '#F84A20']


  return (
    <div className=" d-flex justify-content-center align-item-center">
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center"><h4>Channel Colors</h4></div>
        <div className="d-flex justify-content-center">
          <GithubPicker className="OnBrandColor github-picker_1" colors={color} onChange={(e) => props.changeMainColor(e.hex)} />
        </div>
      </div>
    </div>

  );
}
const mapStateToProps = (state) => {
  return {
    mainColor: state.channelSettings.mainColor
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMainColor: (e) => dispatch(actions.setMainColor(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(BrandColor);