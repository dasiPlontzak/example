import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
import { publishChannel } from "../../../services/Channel.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImgSrc from "../../../assets/defaultImg.png";
import { useHistory } from "react-router-dom";
import {
  deleteAudio,
  saveAudio,
  updateAudio,
} from "../../../services/Audio.service";
import "./../CollapseConfigurator/CollapseConfigurator.css";
import { trackPromise } from "react-promise-tracker";

function CollapseConfigurator(props) {
  const target = useRef(null);
  const channelName = useParams().ChannelName;
  const userName = useSelector((state) => state.user.userName);
  const currentChannel = useSelector((state) => state.channel.currentChannel);
  const audios = useSelector((state) => state.audio.audioList);
  const history = useHistory();
  const dispatch = useDispatch();

  const channelConfiguration = {
    channelSettings: useSelector((state) => state.channelSettings),
    editHeader: useSelector((state) => state.editHeader),
    editSubscription: useSelector((state) => state.editSubscription),
  };
  const publishRecord = () => {
    if (!props.currentAudio.img) {
      console.log(defaultImgSrc);
      fetch(defaultImgSrc)
        .then((r) => {
          return r.blob();
        })
        .then((blobFile) => {
          let name = "defaultImgSrc.png";
          var fileToUpload = new File([blobFile], name, {
            lastModified: new Date().getTime(),
            type: blobFile.type,
          });
          let imgUrl = URL.createObjectURL(fileToUpload);
          dispatch(actions.changeCurrentAudioImage(imgUrl));
            saveAudio(
              { ...props.currentAudio, img: imgUrl },
              props.dispatchAddRecord,
              props.userName,
              history,
              channelName
            
          );
        });
    } else
        saveAudio(
          props.currentAudio,
          props.dispatchAddRecord,
          props.userName,
          history,
          channelName
        
      );
  };
  const updateRecord = () => {
    updateAudio(
      props.dispatchUpdateRecord,
      props.currentAudio,
      props.audio,
      history,
      userName
    );
  };

  const handlePublish = () => {
    if (window.location.pathname.includes("AddRecord")) {
      trackPromise(publishRecord());
    } else if (window.location.pathname.includes("audio=")) {
      updateRecord();
    } else {
      let channel = {
        ...currentChannel,
        audios: audios,
        channelConfiguration: channelConfiguration,
      };
      trackPromise(publishChannel(userName, channelName, channel));
    }
  };

  return (
    <div className="justify-content-center innerDivBottomConfiguratorFix">
      <div className="d-flex justify-content-center align-items-center ">
        {/* <OverlayTrigger
              target={target.current} key="top"
              placement="top"
              overlay={
                <Tooltip
                  id="tooltip-top"
                  style={{
                    display:
                      !props.editHeader.text.title ||
                        !props.editHeader.text.body ?
                        'block' : 'none'
                  }}
                >
                  Title\ body is missing
            </Tooltip>
              }> */}
        <button
          onClick={handlePublish}
          ref={target}
          className="innerDivBottomConfigurator iconBottom"
          // style={{ opacity: !props.editHeader.text.title || !props.editHeader.text.body ? 0.5 : 1 }}
          // onClick={publish}
        >
          <FontAwesomeIcon icon={["fas", "file-export"]} /> Publish
        </button>
        {/* </OverlayTrigger> */}
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <button className="innerDivBottomCancel iconBottom">Cancel</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    editHeader: state.editHeader,
    channelSettings: state.channelSettings,
    audioList: state.audio.audioList ? state.audio.audioList : [],
    currentAudio: state.audio.currentAudio,
    userName: state.user.userName,
    audio: state.audio.audioList.filter(
      (a) => a._id === state.audio.currentAudio._id || null
    )[0],
  };
};
const mapDispatchToProps = (dispatch) => ({
  changeCurrentComponent: (e) => dispatch(actions.setCurrentComponent(e)),
  dispatchAddRecord: (audio) => dispatch(actions.saveAudio(audio)),
  dispatchUpdateRecord: (audio) => dispatch(actions.updateAudio(audio)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollapseConfigurator);
