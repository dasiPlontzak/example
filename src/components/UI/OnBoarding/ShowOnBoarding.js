import React, {useState} from "react";

/*onboarding imports*/
import MainModal from "./MainModal";
import LetsStart from "./LetsStart";
import WhoAreYou from "./WhoAreYou";
import ChannelName from "./ChannelName";
import BrandColor from "./BrandColor";
import LoadingChannel from "./LoadingChannel";


export default function ShowOnBoarding(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <MainModal show={props.show} handleShow={handleShow}>
      {/* <LetsStart /> */}
      <LetsStart/>
      <WhoAreYou />
      <ChannelName />
      <BrandColor />
      <LoadingChannel />
    </MainModal>
  );
}
