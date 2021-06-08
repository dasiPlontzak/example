import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import icon from "../../../assets/Quarter note.svg";
import Channel from "../../../assets/Channel.svg";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../../../redux/actions";
import "./CollapseConfigurator.css";

function CollapseConfigurator(props) {
  const target = useRef(null);
  const history = useHistory();
  const channelName = useParams().ChannelName;
  const userName = useSelector((state) => state.user.userName);
  const basicRouterFromAudioList = `/admin/${userName}`;
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const audios = useSelector((state) => state.audio.audioList);

  // const publish = () => {
  //   if (props.editHeader.text.title && props.editHeader.text.body) {
  //     console.log("ok")
  //   }

  // }

  return (
    <div className="collapseConfigurator">
      <div className="buttonGroup mr-2">
        <button
          className="buttonsList button1 d-flex justify-content-between"
          onClick={() => {
            history.push(
              `${basicRouterFromAudioList}/${channelName}/AddRecord/false`
            );
          }}
        >
          <span>Add record</span>
          <img src={icon} className="icons" />
        </button>
        <button
          className="buttonsListPromo button2 d-flex justify-content-between"
          // onClick={() =>
          //   history.push(`${basicRouterFromAudioList}/Promo`)
          // }
        >
          <span>Add Promo - Soon</span>
          <img src={Channel} className="icons" />
        </button>
        {/* <button
          disabled={false}
          className="buttonsList button3 d-flex justify-content-between"
          onClick={() => {
            history.push(`${basicRouterFromAudioList}/AddChannel/false`)
          }
          }
        >
          <span> Add channel - Soon</span>
          <img src={VoiceRecorder} className="icons" />
        </button> */}
        {/* <button className="buttonsList button4 d-flex justify-content-between" disabled={false}>
          <span>Subscribers - Soon</span>
          <img src={Account} className="icons" />
        </button> */}
        {/* <button className="buttonsList button5 d-flex justify-content-between">
          <span>Statistics - Soon</span>
          <img src={Infographic} className="icons" />
        </button> */}
      </div>

      <Accordion activeKey={props.currentComponent} className="text-left">
        {props.children
          ? props.children.length
            ? props.children.map((child, key) => (
                <React.Fragment key={key}>
                  {React.cloneElement(child)}
                </React.Fragment>
              ))
            : props.children && React.cloneElement(props.children)
          : ""}
      </Accordion>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    editHeader: state.editHeader,
    logoSrc: state.editHeader.image.logo,
    homeImgSrc: state.editHeader.image.channel,
    editGrid: state.channelSettings.editGrid,
    channelSettings: state.channelSettings,
    audioList: state.audio.audioList ? state.audio.audioList : [],
    currentComponent: state.site.currentComponent,
  };
};
const mapDispatchToProps = (dispatch) => ({
  changeCurrentComponent: (e) => dispatch(actions.setCurrentComponent(e)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollapseConfigurator);
