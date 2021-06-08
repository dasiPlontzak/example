import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import RecordOrUploadAudio from "./RecordOrUploadAudio";

export default function Promo() {
  const [blob, setBlob] = useState(null);
  const [blobURL, setBlobURL] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const history = useHistory();

  return (
    <div className="col-md-8 ml-auto mr-auto text-center m-5 p-4">
      <Button onClick={() => history.goBack()}>Back</Button>
      <h1>Record your promo</h1>
      <br /> 
      <h2>You can record promo for your channel. </h2>
      <h2>This promo will be played before each podcast.</h2>
      <br /> 

      <RecordOrUploadAudio
        blobURL={blobURL}
        setBlobURL={setBlobURL}
        setBlob={setBlob}
        audioFile={audioFile}
        setAudioFile={setAudioFile}
      />
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        Save
      </Button>
    </div>
  );
}
