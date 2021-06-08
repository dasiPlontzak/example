import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { actions } from "../../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";
import * as Yup from "yup";

import DeleteConfirm from "./DeleteConfirm";
import RecordOrUploadAudio from "./RecordOrUploadAudio";
import {
  saveAudio,
  updateAudio,
  createAudioFile,
} from "../../services/Audio.service";


function RecorderAudio(props) {
  const [blob, setBlob] = useState(null);
  const [img, setImg] = useState(props.audio ? props.audio.img : null);
  const [imgSrc, setImgSrc] = useState(new FormData());
  const [blobURL, setBlobURL] = useState(
    props.audio ? props.audio.audioUrl : null
  );
  let [audioFile, setAudioFile] = useState(null);
  const [
    showConfirmDeleteWhenUpdate,
    setShowConfirmDeleteWhenUpdate,
  ] = useState(false);

  const history = useHistory();
  const { isUpdateMode } = useParams();

  const RecorderAudioSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    description: Yup.string().min(10, "Too Short!").max(250, "Too Long!"),
  });

  const handleSubmit = (values) => {
    var audioDetails = values;
    audioDetails._id = props.audio ? props.audio._id : null;

    //todo: to alert if blob is empty
    setAudioFile(props.audio ? props.audio.audioUrl : null);
    // if (blob && isUpdateMode === "true")
    //   handleShowConfirmDeleteWhenUpdate();
    if (blob) {
      if (isUpdateMode === "true") handleShowConfirmDeleteWhenUpdate();
      console.log("blob is changed");
      audioFile = createAudioFile(blob);
      // setAudioFile(createAudioFile(blob));
    }
    audioDetails.duration = audioFile ? Math.ceil(audioFile.size / 1024 / 16) : 0;
    // console.log("imgAndAudioFiles:  " + imgAndAudioFiles);
    isUpdateMode !== "false"
      ? updateAudio(props.dispatchUpdateAudio, img, audioFile, audioDetails)
      : saveAudio(props.dispatchNewAudio, img, audioFile, audioDetails);
    setBlobURL("");
    // history.push("/")
  };

  const onChangeHandlerImage = (event) => {
    //שימוש בFileReader לצורך הצגה מקומית של התמונה, היות ולוקח כמה שניות עד שחוזר url מהשרת.
    const reader1 = new FileReader();
    const file = event;
    reader1.onloadend = () => {
      setImgSrc(reader1.result);
    };
    reader1.readAsDataURL(file);
    console.log("event", event);
    var fileToUpload = event;
    setImg(fileToUpload);
  };

  const handleShowConfirmDeleteWhenUpdate = () => {
    setShowConfirmDeleteWhenUpdate(!showConfirmDeleteWhenUpdate);
  };
  const DeleteAudio = () => { };

  // const handleUploadAudio = (file) => {
  //   console.log(file);
  //   setAudioFile(file);
  // };

  return (
    <div className="col-md-8 ml-auto mr-auto text-center m-5 p-4">
      <Button onClick={() => history.goBack()}>Back</Button>
      <Formik
        initialValues={{
          title: props.audio ? props.audio.title : "",
          description: props.audio ? props.audio.description : "",
          img: props.audio ? props.audio.img : "",
          audioUrl: props.audio ? props.audio.audioUrl : "",
        }}
        validationSchema={RecorderAudioSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values, handleChange, handleBlur, isValid, touched }) => (
          <Form className="align-items-center">
            <div className="col-md-4">
              <div className="input-group form-group m-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icons.Mic />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Enter title..."
                  onChange={handleChange("title")}
                  aria-describedby="titleHelp"
                />
                <small id="titleHelp" className="form-text text-muted">
                  {errors.title && touched.title ? (
                    <div>{errors.title}</div>
                  ) : null}
                </small>
              </div>
              <div className="input-group  m-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <Icons.Mic />
                  </span>
                </div>
                <input
                  type="textarea"
                  className="form-control"
                  name="description"
                  placeholder="Enter Audio description..."
                  value={values.description}
                  onChange={handleChange("description")}
                  onBlur={handleBlur}
                />
                <small id="titleHelp" className="form-text text-muted">
                  {errors.description ? <div>{errors.description}</div> : null}
                </small>
              </div>

              <div className="row m-2">
                <label htmlFor="recordImg">Choose your image:</label>
              </div>

              <div className="row m-2">
                {values.img && (
                  <img
                    referrerPolicy="no-referrer"
                    src={values.img}
                    alt="record img"
                  />
                )}
                <input
                  type={"file"}
                  id="recordImg"
                  htmlFor="myInput"
                  accept="image/*"
                  onChange={(e) => onChangeHandlerImage(e.target.files[0])}
                />
              </div>
              <RecordOrUploadAudio
                blobURL={blobURL}
                setBlobURL={setBlobURL}
                setBlob={setBlob}
                audioFile={audioFile}
                setAudioFile={setAudioFile}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={
                  !isValid ||
                  (isUpdateMode === "false" &&
                    Object.keys(touched).length === 0 &&
                    touched.constructor === Object)
                }
                onClick={() => {
                  history.goBack();
                }}
              >
                {isUpdateMode !== "false" ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <DeleteConfirm
        show={showConfirmDeleteWhenUpdate}
        handleShow={handleShowConfirmDeleteWhenUpdate}
        DeleteAudio={DeleteAudio}
      />
    </div>
  );
}

export default connect(
  (r_state, ownProps) => {
    return {
      audio: r_state.audio.audioList.filter(
        (a) => a._id === ownProps.match.params.audioId
      )[0],
    };
  },
  (dispatch) => {
    return {
      dispatchNewAudio: (data) => {
        dispatch(actions.saveAudio(data));
      },
      dispatchUpdateAudio: (data) => {
        dispatch(actions.updateAudio(data));
      },
    };
  }
)(RecorderAudio);
