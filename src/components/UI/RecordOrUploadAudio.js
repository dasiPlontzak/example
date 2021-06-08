import React, { useState } from "react";
import Record from "./Record";

export default function RecordOrUploadAudio(props) {
  // const [blob, setBlob] = useState(props.blob ? props.blob : null);
  // const [blobURL, setBlobURL] = useState(props.blobURL ? props.blobURL : null);


  const handleUploadAudio = (file) => {
    console.log(file);
    props.setAudioFile(file);
  };

  return (
    <div>
      <Record blobURL={props.blobURL} setBlobURL={props.setBlobURL} setBlob={props.setBlob} />

      <div className="row m-2">
        <label htmlFor="recordFile">Upload mp3 file:</label>
      </div>
      <div className="row m-2">
        <input
          type="file"
          id="audioUpload"
          onChange={(e) => handleUploadAudio(e.target.files[0])}
        />
      </div>
    </div>
  );
}
