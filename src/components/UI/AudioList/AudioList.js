import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChannelByName } from "../../../services/Channel.service";
import SingleAudio from "../SingleAudio/SingleAudio";
import {
  TextArea,
  BackgroundColor,
  Div,
  TextsDiv,
} from "../ElementsWithStyledComponent";
import AddSingleAudio from "../SingleAudio/AddSingleAudio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import SubscribeForm from "../SubscribeForm/SubscribeForm";
import { actions } from "../../../redux/actions";
import FloatingPlayer from "../FlowtingPlayer/FloatingPlayer";
import UploadImg from "./UploadImg";
import ImgCrop from "../RecordDetails/Crop/indexCrop";
import autosize from "autosize";
import { defaultConfigurationValues } from "../../configuration/defaultConfigurationValues.js";
import "./AudioList.css";

function AudioList(props) {
  const [active, setActive] = useState(false);
  const [opacityImg, setOpacityImg] = useState("1");
  const { ChannelName } = useParams();

  const [pagination, setPagination] = useState({
    data: props.audioList,
    currentData: [],
    offset: 0,
    pageCount: 0,
  });
  const [display, setdisplay] = useState({
    displaySubscribe: "visible",
    displaySubscribeForm: "none",
  });
  // let  Subscribedisplay="block"
  // let SubscribeFormydisplay = "none"
  const titleRef = React.createRef();
  const audioId = useSelector((state) => state.audio);
  const userName = useSelector((state) => state.user.userName);
  const bodyRef = React.createRef();

  const [showCropper, setShowCropper] = useState(false);
  const [imgId, setImgId] = useState(null);
  const [editZoom, setEditZoom] = useState();
  const [editRotation, setEditRotation] = useState();
  const [editImg, setEditImg] = useState();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [showEditImg, setshowEditImg] = useState(false);
  // const [placeIconImg, setPlaceIconImg] = useState("40%");
  const [file, setFile] = useState(null);
  const [imageType, setImageType] = useState(null);

  useEffect(() => {
    autosize(titleRef.current);
    autosize(bodyRef.current);
    //call here to ShowOnBoarding
    getChannelByName(
      props.initialChannel,
      props.initialAudios,
      initialConfiguration,
      ChannelName,
      userName,
      (data) => {
        setPagination((prevState) => ({
          ...prevState,
          data: data,
        }));
      }
    );
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      data: props.audioList,
      currentData: props.audioList.slice(
        pagination.offset,
        pagination.offset + parseInt(props.channelSettings.showInPage)
      ),
    }));
  }, [props.audioList]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount:
        prevState.data.length / parseInt(props.channelSettings.showInPage),
      currentData: prevState.data.slice(
        pagination.offset,
        pagination.offset + parseInt(props.channelSettings.showInPage)
      ),
    }));
  }, [props.channelSettings.showInPage, pagination.offset, pagination.data]);

  const initialConfiguration = async (channelConfiguration) => {
    if (!channelConfiguration)
      channelConfiguration = defaultConfigurationValues();
    await props.initialChannelSettingsConfiguration(
      channelConfiguration.channelSettings
    );
    await props.initialEditHeaderConfiguration(channelConfiguration.editHeader);
    await props.initialEditSubscribtionConfiguration(
      channelConfiguration.editSubscription
    );
  };

  function handlePageClick(event) {
    const selected = event.selected;
    const offset = selected * parseInt(props.channelSettings.showInPage);
    setPagination({ ...pagination, offset });
  }

  function onClickSubscribe() {
    setdisplay({ displaySubscribeForm: "block" });
    setdisplay({ displaySubscribe: "hidden" });
  }

  function changeImage(file, img) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        setImageType(img);
        setFile(file);
        setImgId(reader.result);
        setEditZoom(1);
        setEditRotation(0);
        setCroppedAreaPixels(null);
        setCrop({ x: 0, y: 0 });
        setShowCropper(true);
        setshowEditImg(true);
        // setPlaceIconImg("50%");
      };
    }
  }
  function EditUploadImage() {
    if (imgId) setShowCropper(true);
  }

  function ShowCropperInClose(close) {
    setShowCropper(close);
  }

  function Cb(child, editImg, zoom, rotation, croppedAreaPixels, crop) {
    setShowCropper(child);
    setEditImg(editImg);
    setEditZoom(zoom);
    setEditRotation(rotation);
    setCroppedAreaPixels(croppedAreaPixels);
    setCrop(crop);
  }

  //Editor- quill. Don't delete !!!!!
  // const handleChange = (fullValue, action, actionConfig) => {
  //   let span = document.createElement('span');
  //   span.innerHTML = fullValue;
  //   let value = span.textContent || span.innerText;
  //   action(fullValue)
  //   actionConfig(value)
  // }

  return (
    <>
      {showCropper && (
        <ImgCrop
          id={imgId}
          source="homePage"
          file={file}
          img={imageType}
          zoom={editZoom}
          rotation={editRotation}
          croppedAreaPixels={croppedAreaPixels}
          crop={crop}
          Cb={Cb}
          changeImage={changeImage}
          ShowCropperInClose={ShowCropperInClose}
        />
      )}
      {!showCropper && (
        <div id="stage">
          <div className="AudioDivContainer align-self-center">
            <div
              className="currentAudioUploadImgOnHover"
              onMouseOver={() => {
                setOpacityImg("0.7");
              }}
              onMouseLeave={() => {
                setOpacityImg("1");
              }}
              onClick={() => props.changeCurrentComponent("Edit Header")}
            >
              <div
                style={{
                  backgroundImage: `url(${props.homeImgSrc})`,
                  opacity: opacityImg,
                }}
                className="divUploadImage"
              >
                <div style={{ paddingLeft: "5%" }}>
                  <div
                    className="d-flex ss"
                    style={{ paddingLeft: "0%", paddingTop: "3%" }}
                  >
                    <UploadImg
                      showEditImg={showEditImg}
                      EditImg={EditUploadImage}
                      changeImage={changeImage}
                    />
                  </div>
                  <TextsDiv
                    style={{ paddingTop: "0% !important" }}
                    align={props.editHeader.alignment}
                    onMouseOver={() => {
                      setOpacityImg("1");
                    }}
                  >
                    <TextArea
                      style={{ zIndex: "3" }}
                      className="title inputNoneDisplay editText textAreaChannelTitle"
                      editHeader={props.editHeader}
                      textKind={"title"}
                      onKeyPress={(e) =>
                        e.key == "Enter" &&
                        e.target.value.includes("\n") &&
                        e.preventDefault()
                      }
                      onChange={(e) => props.changeTitleText(e.target.value)}
                      value={props.editHeader.text.title}
                      placeholder="Welcome to&#13;&#10;your channel"
                      rows="1"
                      ref={titleRef}
                      maxLength="50"
                    ></TextArea>
                    {/* Quill don't delete!!!!! */}
                    {/* <Editor
                      placeholder="Welcome to&#13;&#10;your channel"
                      style={{
                        zIndex: "3",
                        fontSize: props.editHeader.fontSize.title,
                        height: '130px'
                      }}
                      changeText={(e) => handleChange(e, props.changeTitleText, props.changeTitleConfig)}
                      value={props.editHeader.text.title}
                      maxLength="60"
                      onMouseOver={(e) => e.preventDefault()}
                      id="title"
                    >
                    </Editor> */}
                  </TextsDiv>
                  <TextsDiv
                    align={props.editHeader.alignment}
                    onMouseOver={() => {
                      setOpacityImg("1");
                    }}
                  >
                    <TextArea
                      style={{ zIndex: "3" }}
                      className="description inputNoneDisplay editText textAreaChannelTitleBody "
                      editHeader={props.editHeader}
                      textKind={"body"}
                      onKeyPress={(e) => {
                        e.key == "Enter" &&
                          (e.target.value.match(/\n/g) || []).length == 2 &&
                          e.preventDefault();
                      }}
                      onChange={(e) => props.changeBodyText(e.target.value)}
                      value={props.editHeader.text.body}
                      placeholder="don’t Act So Surprised, Your Highness. You Weren’t On Any Mercy&#13;&#10;Mission This Time. Seve…"
                      rows="1"
                      ref={bodyRef}
                      maxLength="250"
                    ></TextArea>
                    {/* Quill don't delete!!!!! */}
                    {/* <Editor
                      placeholder="don’t Act So Surprised, Your Highness. You Weren’t On Any Mercy&#13;&#10;Mission This Time. Seve…"
                      style={{
                        zIndex: "3",
                        fontSize: props.editHeader.fontSize.body,
                        height: "45px",
                        textAlign: props.editHeader.alignment
                      }}
                      changeText={(html) => handleChange(html, props.changeBodyText, props.changeBodyConfig)}
                      value={props.editHeader.text.body}
                      maxLength="260"
                      onMouseOver={(e) => e.preventDefault()}
                      id="bodyChannel"
                    >
                    </Editor> */}
                  </TextsDiv>
                  {/* <div className="row d-flex flex-row-reverse align-items-end ">
                    <button className="Subscribe" style={{ visibility: display.displaySubscribe }} onClick={onClickSubscribe}  ><h6 style={{ margin: '5px' }}>Subscribe</h6></button>
                  </div> */}
                </div>
                <div className="iconDiv">

                  <div className="d-flex justify-content-around">
                    <div></div>
                    <div></div>
                    <div>
                    <input
                    type="file"
                    name="file"
                    accept="image/*"
                    id={`channelImagefile`}
                    className="inputfile"
                    onChange={(e) => changeImage(e.target.files[0], "channel")}
                  />
                      <label
                        htmlFor={`channelImagefile`}
                        className="d-inline-flex d-flex justify-content-center align-items-center "
                        onClick={EditUploadImage}
                        style={{width: "100%", paddingBottom:"0PX" }}
                      >
                        <div
                          // style={{ right: placeIconImg }}
                          className="wrapIconUploadInHome"
                        >
                          <FontAwesomeIcon
                            id="angle-right"
                            className="iconCloudUploadForCurrentAudio"
                            icon={["fas", "cloud-upload-alt"]}
                          ></FontAwesomeIcon>
                          {/* <p className="textUploadImg">Upload an image</p> */}
                        </div>
                      </label>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                      {/* {showEditImg && (
                        <div className="wrapIconEdit">
                          <FontAwesomeIcon
                            id="image"
                            className="iconCloudUploadForCurrentAudio"
                            icon={["fas", "image"]}
                            onClick={EditImg}
                          ></FontAwesomeIcon>
                          <p className="textUploadImg">Edit Image</p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ display: "block", paddingLeft: "0.7%" }}
              className="SubscribeForm"
              onClick={() => props.changeCurrentComponent("Edit Subscription")}
            >
              <SubscribeForm />
            </div>
            <div className="row channelNameLine">
              <div className="col-md-6 searchIcon">
                <div className="col-md-4 editGridIcons">
                  <FontAwesomeIcon
                    id="th-large"
                    className="linksIcons"
                    icon={["fas", "th-large"]}
                    onClick={() => props.changeEditGrid("grid")}
                    style={{
                      color:
                        props.channelSettings.editGrid == "grid"
                          ? "#490081"
                          : "",
                    }}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    id="bars"
                    className="linksIcons"
                    icon={["fas", "bars"]}
                    onClick={() => props.changeEditGrid("list")}
                    style={{
                      color:
                        props.channelSettings.editGrid == "grid"
                          ? ""
                          : "#490081",
                    }}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
            <Div
              onClick={() => props.changeCurrentComponent("Channel Settings")}
              channelSettings={props.channelSettings}
              className={
                props.channelSettings.editGrid == "grid" ? "responsiveGrid" : ""
              }
            >
              <AddSingleAudio />
              {pagination.currentData &&
                pagination.currentData.map((audio) => (
                  <SingleAudio key={audio._id} audioId={audio._id} />
                ))}
            </Div>

            {audioId.playNowAudioId != undefined &&
            audioId.smallScreen == false ? (
              <FloatingPlayer _id={audioId.playNowAudioId} />
            ) : (
              ""
            )}

            <ReactPaginate
              previousLabel={
                <div>
                  <p className="paginationP">{"<"}</p>
                </div>
              }
              nextLabel={
                <div>
                  <p className="paginationP">{">"}</p>
                </div>
              }
              breakLabel={"..."}
              pageCount={pagination.pageCount ? pagination.pageCount : "1"}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
            <div style={{ display: "inline-block" }}>
              <label className="textField">Show In Page</label>
              <select
                className="textField SelectChanel showInPage"
                name="showInPage"
                id="showInPage"
                onChange={(e) => props.changeShowInPage(e.target.value)}
                value={props.channelSettings.showInPage}
              >
                <option value="20">20</option>
                <option value="15">15</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (r_state) => {
  return {
    configText: r_state.configText,
    channelSettings: r_state.channelSettings,
    editHeader: r_state.editHeader,
    logoSrc: r_state.editHeader.image.logo,
    homeImgSrc: r_state.editHeader.image.channel,
    editGrid: r_state.channelSettings.editGrid,
    channelSettings: r_state.channelSettings,
    audioList: r_state.audio.audioList ? r_state.audio.audioList : [],
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeTitleText: (e) => dispatch(actions.setTitleText(e)),
  changeShowInPage: (e) => dispatch(actions.setShowInPage(e)),
  initialChannel: (data) => dispatch(actions.initialChannel(data)),
  initialAudios: (data) => dispatch(actions.initialAudios(data)),
  initialChannelSettingsConfiguration: (data) =>
    dispatch(actions.initialChannelSettingsConfiguration(data)),
  initialEditHeaderConfiguration: (data) =>
    dispatch(actions.initialEditHeaderConfiguration(data)),
  initialEditSubscribtionConfiguration: (data) =>
    dispatch(actions.initialEditSubscribtionConfiguration(data)),
  changeBodyText: (e) => dispatch(actions.setBodyText(e)),
  changeImage: (file, key) =>
    dispatch(actions.setImage({ file: file, key: key })),
  changeEditGrid: (e) => dispatch(actions.setEditGrid(e)),
  changeCurrentComponent: (e) => dispatch(actions.setCurrentComponent(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AudioList);
