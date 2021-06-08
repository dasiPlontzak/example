import React, { useEffect, useState } from "react";
import Moment from "moment";
import * as Icons from "react-bootstrap-icons";
import { connect, useSelector, useDispatch } from "react-redux";
import { actions } from '../../../redux/actions';
import DeleteAudio from "../DeleteAudio";
import { useHistory, useLocation } from "react-router-dom";
import imgSrc from '../../../assets/boy.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '../ElementsWithStyledComponent';
import CreateDateViewsCommentsWithIcons from "../CreateDateViewsCommentsWithIcons/createDateViewsCommentsWithIcons";
import Sharing from './Option/Sharing.js';
import Download from './Option/Download.js';
import { addCounterViews, scondsToHHMMSSFormat } from '../../../services/Audio.service';
import FlowtingPlayer from '../FlowtingPlayer/FloatingPlayer'
import PodcastSharingOption from './Option/podcastSharingOption/podcastSharingOption'
import {secondsToHHMMSSFormat} from '../../../services/Audio.service';
import './SingleAudio.css';

function SingleAudio(props) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.userName);


  const { _id, title, description, img, createDate, duration, counterViews } = props.audio;

  var l=window.location.href
  var p=l.replace("/admin/", "/");
  let URL = p + `/audio=${_id}`.replace("/admin/", "/");
  let counterViewsAction = (data) => dispatch(actions.addCounterViews(data));
  const [smallScreen, setSmallScreen] = useState(false);
  const editGrid = props.channelSettings.editGrid;
  const audioId = useSelector(state => state.audio)
  let addCounterViewsUpdate = {
    "fieldName": "counterViews",
    "value": counterViews + 1
  }
   
  function openAudio() {
    addCounterViews(counterViewsAction, addCounterViewsUpdate, userName);
    dispatch(actions.setCurrentAudio(props.audio));
    history.push(location.pathname + `/audio=${_id}`)
  }

  function cancel(e) {
    e.stopPropagation();
  }

  const screenSmallShow = (e) => {
    e.stopPropagation();

    // setIdModal(_id);
    // setSmallScreen(true);
    dispatch(actions.setSmallScreen(false));
    dispatch(actions.setPlayNowAudioId(props.audio._id));
    //  console.log("id state" +audioId.selectAudioId);
  }
  return (
    <>
      <div onClick={openAudio} className={editGrid == 'grid' ? 'singleAudioCard gridCard shadow  mb-5 bg-white rounded' : 'singleAudioCard listCard row shadow  mb-5 bg-white rounded'}>
        <div className={editGrid == 'grid' ? 'divOfImg' : 'col-md-4 divOfImg listDivOfImg'}>
          <img className={editGrid == 'grid' ? "card-img-top card-img" : ' card-img'} src={img} alt="audio pic" />
          <div className="divHoverImg">
            <div className="detailsOnHover">
              <CreateDateViewsCommentsWithIcons
                createDate={createDate}
                views={counterViews} />
            </div>
          </div>
        </div>
        <div className={editGrid == 'grid' ? 'cardBody ' : 'cardBody listCardBody col-md-4'} style={{ position: "relative" }}>
          <h5 className="card-title">{title}</h5>
          <p className="card-text shortDescription">{description}</p>
        </div>
        {/* //singleAudio// */}
        <div className={editGrid == 'grid' ? ' row justify-content-between' : 'col-md-4 d-flex flex-row-reverse '}>
          <div className={editGrid == 'grid' ? ' d-flex flex-row TimeAndPodcastSharingOption_a' : ' d-flex flex-row-reverse justify-content-end flex-wrap TimeAndPodcastSharingOption'}>
            <div className={editGrid == 'grid' ? 'col-auto mr-auto ' : ' d-flex justify-content-end'}
               onClick={cancel}>
              <PodcastSharingOption url={URL} id={_id} />
            </div>
            <div className="col"><span className="durationSpan"> {secondsToHHMMSSFormat(duration)}</span> </div>
          </div>
          <div >
            {/* className="col-auto" */}
            <Button 
            // className="d-flex justify-content-center align-items-center BTPlaySingle"
              channelSettings={props.channelSettings}
              className={editGrid == 'grid' ? 'playButton gridPlayButton d-flex justify-content-center align-items-center BTPlaySingle' : 'playButton listPlayButton d-flex justify-content-center align-items-center BTPlaySingle'}
              type="button"
              onClick={screenSmallShow}
              onDoubleClick={cancel}
            >
              <FontAwesomeIcon
                style={{ textAlign: "center", marginLeft: '15%', fontSize: '40px' }}
                id='caret-right'
                className="playIcons "
                icon={['fas', 'caret-right']}
              ></FontAwesomeIcon>
            </Button></div>
        </div>
        {smallScreen ? <FlowtingPlayer _id={_id} cancel={cancel} /> : ''}
      </div>
      {smallScreen ? <FlowtingPlayer _id={_id} cancel={cancel} /> : ''}

    </>
  );
}
const mapStateToProps = (r_state, ownProps) => {
  return {
    audio: r_state.audio.audioList.filter((a) => a._id === ownProps.audioId)[0],
    channelSettings: r_state.channelSettings
  };
}

export default connect(mapStateToProps, null)(SingleAudio);