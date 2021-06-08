import React, { useState,useRef } from "react";
import { Button } from 'react-bootstrap';
import { KeyboardVoice, Backup } from '@material-ui/icons';
import { useHistory, useLocation } from "react-router-dom";
import ReactAudioPlayer from 'react-audio-player';
import { actions } from "../../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function RecordOrUpload(props) {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const [urlOfUploadFile, setUrlOfUploadFile] = useState("");
    const userName = useSelector(state => state.user.userName);
const inputRef = useRef()


    function handleUploadAudio(file) {
        var audioURL = URL.createObjectURL(file);
        setUrlOfUploadFile(audioURL);
    }

    const handleLoadMetadata = (meta) => {
        const { duration } = meta.target;
        dispatch(actions.setCurrentAudio({ audioUrl: urlOfUploadFile, duration: Math.ceil(duration), createDate: new Date() }));
        history.push(`${location.pathname}/insertDetails`)
    }
    
    return (
        <>
            <div className="bigText">
                Welcome to {userName}’s studio
            </div>
            <div className="smallText">
                Let’s start create your podcast! put the microphone on,<br /> clear your voice and here we go—<br />
            </div>
            <div className="d-flex">
                <div onClick={()=>inputRef.current.click()}  className="wrap_recordButton">
                    <label htmlFor="audioUpload" >
                        <Button
                             className="recordButton"
                         >
                            <Backup className="recordIcon"
                            />
                            <br />
                            <h1
                                className="textOnButtons"
                            >Upload Record</h1>
                        </Button>
                    </label>
                    <input type="file" ref={inputRef} accept=".mp3" name="file" id="audioUpload"  style={{display: 'none'}} onChange={(e) => { handleUploadAudio(e.target.files[0]) }} />
                    <ReactAudioPlayer
                        src={urlOfUploadFile}
                        onLoadedMetadata={handleLoadMetadata}
                    />
                </div>
                <div className="wrap_recordButton">
                    <Button
                        className="recordButton"
                        onClick={props.nextCurrentComponent}
                    >
                        <KeyboardVoice className="recordIcon" />
                        <br />
                        <h1 className="textOnButtons">Start Record</h1>
                    </Button>
                </div>

            </div>
        </>
    );
}