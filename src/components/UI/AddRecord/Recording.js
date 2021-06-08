import React, { useEffect, useState, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { PlayArrow } from '@material-ui/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from "react-router-dom";
import { secondsToHHMMSSFormat } from '../../../services/Audio.service';
import { actions } from "../../../redux/actions";
import { useDispatch } from 'react-redux';
import recording from '../../../assets/recording.gif'
import small_conected from '../../../assets/small_conected.gif'
import './AddRecord.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

let chunks = [];
let blob;
export default function Recording(props) {
    const [show, setShow] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [mediaRecorderState, setMediaRecorderState] = useState('inactive');
    const [duration, setDuration] = useState(0);
    const mountedRef = useRef(true)
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch()

     useEffect(() => {
        if (navigator.mediaDevices) {
            console.log('getUserMedia supported.');
            var constraints = { audio: true };
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                    setMediaRecorder(new MediaRecorder(stream));
                    // visualize(stream);
                })
        }
    }, []);

    const setMediaRecordStateEvents = () => {
        setMediaRecorderState(mediaRecorder.state);
    }

    useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, [])
    
    useEffect(() => {
        if (mediaRecorder)
            setTimeout(() => {
                pauseRecord()
            }, 4000);
    }, [mediaRecorder])

    const startRecord = (e) => {
        mediaRecorder.start(1000);
        console.log(mediaRecorder);
        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
            console.log(chunks);
            if (!mountedRef.current) return null
            setDuration(chunks.length);
            return chunks.length;
        }

        mediaRecorder.onpause = setMediaRecordStateEvents;
        mediaRecorder.onstart = setMediaRecordStateEvents;
        mediaRecorder.onresume = setMediaRecordStateEvents;
    }

    const replayRecord = (e) => {
        mediaRecorder.stop();
        blob = null;
        chunks = [];
        console.log(mediaRecorder.state);
        setShow(false)
        pauseRecord()
    }

    const pauseRecord = (e) => {
        console.log(chunks);
        switch (mediaRecorder.state) {
            case 'inactive':
                startRecord();
                break;
            case 'paused':
                mediaRecorder.resume();
                break;
            case 'recording':
                mediaRecorder.pause();
                break;
        }
        console.log(mediaRecorder.state);
    }

    const stopRecord = (e) => {
        if (mediaRecorder.state != 'inactive') {
            mediaRecorder.stop();
            blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            chunks = [];
            var audioURL = URL.createObjectURL(blob);
            console.log(audioURL);
            dispatch(actions.setCurrentAudio({ audioUrl: audioURL, duration: duration, createDate: new Date() }));
            history.push(`${location.pathname}/insertDetails`);
        } else {
            alert(`You didn't record anything`);
        }
    }

    const handleShow = () => {
        if (mediaRecorder.state != 'inactive') {
            setShow(true);
            pauseRecord()
        }
    }

    const cancelReplayRecord = () => {
        setShow(false);
        pauseRecord();
    }
       const rout = () => {
        mediaRecorder.stop();
        // blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        chunks = [];
        blob = null;
        props.routingChange(0)
    }
   
    
    return (
        <div>
            <div className="d-flex align-items-start Back " onClick={rout} >
                <ArrowBackIosIcon className="MyChannelIcn" />
           back
  </div>
            <div>
                <div className="bigText" >
                    Recording…
                </div>
                <div className="smallText" style={{ marginBottom: mediaRecorder ? mediaRecorder.state == 'paused' ? '25px' : '0px' : '0px' }}>
                    Keep your environment quiet to get a good sound result
                </div>
                <div className="d-flex justify-content-center align-items-center" >
                    <div className="wrap_recordButton"
                        style={{
                            marginBottom: mediaRecorder ? mediaRecorder.state == 'paused' ? '25px' : '0px' : '0px',
                            paddingTop: mediaRecorder ? mediaRecorder.state == 'paused' ? '25px' : '0px' : '0px'
                        }}>
                        {
                            mediaRecorderState == 'inactive' ?
                                <img
                                    className="recordingImg startCircle"
                                    src={small_conected}
                                ></img> :
                                mediaRecorderState == 'paused' ?
                                    <Button
                                        className="recordButton"
                                        onClick={pauseRecord}
                                    >
                                        <PlayArrow className="recordIcon" />
                                    </Button> :
                                    <img
                                        className="recordingImg"
                                        src={recording}
                                        onClick={pauseRecord}
                                    ></img>
                        }
                    </div>
                </div>
            </div>
            <div >
                <span className="smallText durationSpan recordingDurationSpan">{secondsToHHMMSSFormat(Math.floor(duration))}</span>
            </div>
            <div className="d-flex justify-content-center align-items-center RecordingDivButton">
                <button
                    className="RecordingTwiceButton"
                    onClick={handleShow}
                >
                    <h6>New Record</h6>
                </button>
                <button
                    className="RecordingTwiceSaveButton"
                    onClick={stopRecord}
                >
                    <h6>Save</h6>
                </button>
            </div>
            {/* <div>
                <button></button>
            </div> */}
            <Modal show={show} className="modalDialog">
                <Modal.Header>
                    <CloseIcon
                        onClick={cancelReplayRecord}
                        className="closeButton"
                    ></CloseIcon>
                </Modal.Header>
                <Modal.Title>Are you sure you want to create a new recording?</Modal.Title>
                <Modal.Body >Your current record will be unsaved</Modal.Body>
                <Modal.Footer>
                    <Button className="buttonFooter" onClick={cancelReplayRecord}>
                        No</Button>
                    <Button className="buttonFooter" onClick={replayRecord}>
                        Yes</Button>
                </Modal.Footer>
            </Modal>
        </div >

    );

}