import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BackgroundColor } from "../ElementsWithStyledComponent";
import CreateDateViewsCommentsWithIcons from "../CreateDateViewsCommentsWithIcons/createDateViewsCommentsWithIcons";
import Player from "../Player/Player";
import {
  deleteAudio,
  getAudioById,
  saveAudio,
  updateAudio,
} from "../../../services/Audio.service";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgCrop from "./Crop/indexCrop";
import { useParams } from "react-router-dom";
import defaultImgSrc from "../../../assets/defaultImg.png";
import "./RecordDetails.css";
import Logo from "../../../assets/logo.svg";

function RecordDetails(props) {
  const history = useHistory();
  const { _id } = useParams();
  const channelName = useParams().ChannelName;
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  var includeAdmin = 0;
  const [showCropper, setShowCropper] = useState(false);
  const [imgId, setImgId] = useState(null);
  const [editZoom, setEditZoom] = useState();
  const [editRotation, setEditRotation] = useState();
  const [editImg, setEditImg] = useState();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [showEditImg, setshowEditImg] = useState(false);
  const [placeIconImg, setPlaceIconImg] = useState("40%");

  function Cb(child, editImg, zoom, rotation, croppedAreaPixels, crop) {
    setShowCropper(child);
    setEditImg(editImg);
    setEditZoom(zoom);
    setEditRotation(rotation);
    setCroppedAreaPixels(croppedAreaPixels);
    setCrop(crop);
    console.log("croppedAreaPixels ", croppedAreaPixels);
    console.log("Cb", child);
  }

  useEffect(() => {
    if (!Object.keys(props.currentAudio).length && props.currentAudio.constructor === Object) {
      getAudioById(_id, (audio) => {
        props.setCurrentAudio(audio);
        props.initialAudios(audio);
      });
    }
  })

  useEffect(() => {
    var rout = window.location.href;
    includeAdmin = rout.includes("/admin/");
    if (includeAdmin) setIsAdmin(true);
  }, []);

useEffect(() => {
  if(props.currentAudio.audioUrl==undefined){
   history.push(`/admin/${userName}/${channelName}/AddRecord/false`)
  
  }
 })

  const newRecord = () => {
    history.push(`/admin/${userName}/${channelName}/AddRecord/false`);
    dispatch(actions.setAudio({ audioUrl: "", duration: "00:00" }));
  };
  const changeImage = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        setImgId(reader.result);
        setEditZoom(1);
        setEditRotation(0);
        setCroppedAreaPixels(null);
        setCrop({ x: 0, y: 0 });
        setShowCropper(true);
        setshowEditImg(true);
        setPlaceIconImg("50%");
        // console.log("img", showCropper);
      };
    }
  };
  const cancleSave = () => {
    history.goBack();
  };

  function EditUploadImage() {
    if (imgId) setShowCropper(true);
  }

  const handleDelete = () => {
    deleteAudio(
      props.dispatchDeleteAudio,
      props.currentAudio._id,
      props.userName
    );
    history.goBack();
  };
  const audio = props.currentAudio || {};

  function ShowCropperInClose(close) {
    setShowCropper(close);
  }

  return (
    <>
      <div className="wrapRecordView">
        {showCropper && (
          <ImgCrop
            id={imgId}
            source="singleAudio"
            zoom={editZoom}
            rotation={editRotation}
            croppedAreaPixels={croppedAreaPixels}
            crop={crop}
            changeImage={changeImage}
            ShowCropperInClose={ShowCropperInClose}
            Cb={Cb}
          />
        )}
        {isAdmin && !showCropper ? (
          <>
            <div className="currentAudioUploadImgOnHover">
              <img
                src={audio.img || defaultImgSrc}
                id="img_homeImg"
                className="divUploadImage"
                alt="homeImage"
              />
              <div className="iconDiv">
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  id={`currentAudioImgFile`}
                  className="inputfile"
                  onChange={(e) => changeImage(e.target.files[0])}
                />
                 {/* UPLOAD IN ALL THE DIV */}
                {/* <label
                  htmlFor={`currentAudioImgFile`}
                  className="d-inline-flex d-flex justify-content-center align-items-center"
                  style={{ width: "100%", paddingBottom: "0PX" }}
                >
                  <div
                    style={{ right: placeIconImg }}
                    className=" wrapIconUpload "
                    onClick={EditUploadImage}
                  > */}
                    <div onClick={EditUploadImage} className=" wrapIconUpload "/>

                    <FontAwesomeIcon
                      id="angle-right"
                      className="iconCloudUploadForCurrentAudio"
                      icon={["fas", "cloud-upload-alt"]}
                    ></FontAwesomeIcon>
                    <p className="textUploadImg">Upload an image</p>
                  {/* </div> */}
                {/* </label> */}
                {/* {showEditImg && (
                  <div className="wrapIconEdit">
                    <FontAwesomeIcon
                      id="image"
                      className="iconCloudUploadForCurrentAudio"
                      icon={["fas", "image"]}
                      onClick={EditUploadImage}
                    ></FontAwesomeIcon>
                    <p className="textUploadImg">Edit Image</p>
                  </div>
                )} */}
              </div>
            </div>
          </>
        ) : (
          audio._id &&
          !showCropper && (
            <BackgroundColor imgSrc={audio.img || defaultImgSrc} />
          )
        )}

        {!showCropper && (
          <div className="recordPlayer">
            <Player autoPlayPlayer={false} pause={true} audio={audio} />
            {/* <Button style={{ backgroundColor: "#4B0083" }} onClick={newRecord}>New record</Button> */}
          </div>
        )}
        <div className="d-flex justify-content-between">
          <div className="wrap_recordDetails col-7">
            {!showCropper && (
              <div className="wrap_createDate">
                <CreateDateViewsCommentsWithIcons
                  createDate={audio.createDate}
                  views={audio.counterViews}
                />
              </div>
            )}
            <div className="textDetails">
              {isAdmin && !showCropper ? (
                <>
                  <textarea
                    className="titleInput inputNoneDisplay edit"
                    style={{ border: "2px dashed #e8eaec08" }}
                    rows="1"
                    placeholder="Insert your text here!"
                    value={audio.title}
                    onChange={(e) =>
                      props.setCurrentAudioByFieldName("title", e.target.value)
                    }
                  />
                  <textarea
                    className="descriptionInput inputNoneDisplay edit"
                    style={{ border: "2px dashed #e8eaec08" }}
                    placeholder="Write Stories About Your Business And Use Them To Engage Your Customers… Your Stories Blog Can Be Shared On Your Website, On Social Media, Or Sent Via Email As A Company Newsletter. You Can Add Your Own Images Or Choose From Our Image Library. Use The Form To Invite People To Sign Up To Receive Further Updates Or Your Company Newsletter. You Can Customize This Sign-Up Form In Form Settings. Write Stories About Your Business And Use Them To Engage Your Customers. Your Stories Blog Can Be Shared On Your Website, On Social Media, Or Sent Via Email As A Company Newsletter. You Can Add Your Own Images Or Choose From Our Image Library. Use The Form To Invite People To Sign Up To Receive Further Updates Or Your Company Newsletter. You Can Customize This Sign-Up Form In Form Settings. Write Stories About Your Business And Use Them To Engage Your Customers… Your Stories Blog Can Be Shared On Your Website, On Social Media, Or Sent Via Email As A Company Newsletter. You Can Add Your Own Images Or Choose From Our Image Library. Use The Form To Invite People To Sign Up To Receive Further Updates Or Your Company Newsletter. You Can Customize This Sign-Up Form In Form Settings. Write Stories About Your Business And Use Them To Engage Your Customers. Your Stories Blog Can Be Shared On Your Website, On Social Media, Or Sent Via Email As A Company Newsletter. You Can Add Your Own Images Or Choose From Our Image Library. Use The Form To Invite People To Sign Up To Receive Further Updates Or Your Company Newsletter. You Can Customize This Sign-Up Form In Form Settings."
                    value={audio.description}
                    onChange={(e) =>
                      props.setCurrentAudioByFieldName(
                        "description",
                        e.target.value
                      )
                    }
                  />
                </>
              ) : (
                !showCropper && (
                  <>
                    <h4>{audio.title}</h4>
                    <p>{audio.description}</p>
                  </>
                )
              )}
            </div>
          </div>
          {/* <div>
            <div className=" d-flex ml-auto wrap_createDateSubscriber">
              <div className="BoxSubscriber">
                <img src={Logo} className="ImgLogoSubscide" />
                <h5>Stay Tuned !</h5>
                <input
                  type="text"
                  value="Full Name"
                  className="InputSubscriber"
                ></input>
                <input
                  type="email"
                  value="Email"
                  className="InputSubscriber"
                ></input>
                <button className="ButtonSubscriber">subscide</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    audio: state.audio.audioList.filter((a) => a._id === ownProps._id)[0],
    currentAudio: state.audio.currentAudio,
    userName: state.user.userName,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentAudio: (audio) => dispatch(actions.setCurrentAudio(audio)),
  setCurrentAudioByFieldName: (key, value) =>
    dispatch(actions.setCurrentAudioByFieldName({ key: key, value: value })),
  dispatchAddRecord: (audio) => dispatch(actions.saveAudio(audio)),
  dispatchUpdateAudio: (audio) => dispatch(actions.updateAudio(audio)),
  dispatchDeleteAudio: (audio) => dispatch(actions.deleteAudio(audio)),
  initialAudios:(audios)=>dispatch(actions.initialAudios(audios))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails);
