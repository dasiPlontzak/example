import React, { useState } from "react";
import { Button } from "react-bootstrap";

import Navbar from "./Navbar";

/*onboarding imports*/
import MainModal from "./OnBoarding/MainModal";
import LetsStart from "./OnBoarding/LetsStart";
import WhoAreYou from "./OnBoarding/WhoAreYou";
import ChannelName from "./OnBoarding/ChannelName";
import BrandColor from "./OnBoarding/BrandColor";
import LoadingChannel from "./OnBoarding/LoadingChannel";
import { actions } from "../../redux/actions";
import { connect } from "react-redux";

function HomePage(props) {
  const [show, setShow] = useState(false);
  const { currentUser } = props;
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {/* <div className="row">
        <Navbar />
        <br />
        <br />
        <br />
      </div> */}

      <div className="row">
        <div className="col-md-1" />
        <h1>Welcome To SoundBox</h1>
        <a href="https://accounts.codes/soundBox/login" //?isAdmin=true
          // onClick={this.handleClick}
          >
          Login
        </a>
        {/* <div className="col-md-10">
          {currentUser.email && <h2>Hello, {currentUser.name || currentUser.email} </h2>}
          <br />
          <br />
          <h3>SoundBox Home Page</h3>
          <br />
          <br /> */}
          {/* {currentUser.email && <Button onClick={handleShow}>Let`s Start</Button>} */}
          {/* {currentUser && <Button onClick={handleShow}>Let`s Start</Button>}

          <MainModal show={show} handleShow={handleShow}>
            <LetsStart />
            <WhoAreYou />
            <ChannelName />
            <BrandColor />
            <LoadingChannel />
          </MainModal>
        </div> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.site.currentUser,
  };
};
export default connect(mapStateToProps, null)(HomePage);