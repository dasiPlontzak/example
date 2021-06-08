import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import song from '../../../assets/song.mp3';
import { VolumeUp, VolumeOff, SkipPreviousRounded, PlayArrow, SkipNextRounded, Pause } from '@material-ui/icons';
import { Button } from 'react-bootstrap';
import { secondsToHHMMSSFormat } from '../../../services/Audio.service';
import PodcastSharingOption from '../SingleAudio/Option/podcastSharingOption/podcastSharingOption';
import { useSelector, useDispatch, connect } from "react-redux"
import { actions } from "../../../redux/actions";
import './PlayerButtons.css';
import PlayerVolume from './PlayerVolume';



function PlayerButtons(props) {
    const { duration, audioUrl } = props.audio;
    const audioFromState = useSelector(state => state.audio)
    let audioUrlTemp = audioFromState.playNowAudioId ? audioFromState.audioList.filter((a) => a._id === audioFromState.playNowAudioId)[0].audioUrl : ''
    const [audio, setAudio] = useState(new Audio(audioUrl && !props.autoPlayPlayer ? audioUrl : props.autoPlayPlayer ? audioUrlTemp : ''));
    // const [audio, setAudio] = useState(new Audio(props.audioUrl));
    const [playing, setPlaying] = useState(false);
    const timerID = React.useRef(null);
    const audioRange = React.useRef();
    const [currentTime, setCurrentTime] = useState(0);
    //todo
    // const [duration, setDuration] = useState(useSelector(state => state.audio.currentAudio ? state.audio.currentAudio.duration : ''));
    const [currentTimeState, setCurrentTimeState] = useState(0);
    const [autoPlayPlayer, setAutoPlayPlayer] = useState(props.autoPlayPlayer);
    const [switchRecording, setSwitchRecording] = useState(false)
    const location = useLocation();
    const [volume, setVolume] = useState(true);
    let URL = location.pathname;
    const dispatch = useDispatch();
    useEffect(() => {
        audio.addEventListener('ended', () => {
            if (props.autoPlayPlayer)
                props.endAudioFunc(true);
            else
                setPlaying(!playing)
        });
    })
    useEffect(() => {
        setCurrentTimeState(props.currentTime)
    }, [props.currentTime])
    useEffect(() => {
        audio.loop = props.loopAudio
    }, [props.loopAudio])
    useEffect(() => {
        audio.volume = props.volume
    }, [props.volume])

    useEffect(() => {
        audio.muted = props.muted;
    }, [props.muted])

    useEffect(() => {

        if (props.autoPlayPlayer) {
            if (audio.src != props.audio.audioUrl) {
                if (playing) {
                    audio.pause();
                    setPlaying(false)
                }
                setSwitchRecording(true)
                setAudio(new Audio(audioUrlTemp));
            }
        }
    })
    useEffect(() => {
        audio.currentTime = Math.ceil(props.currentTime)
        setCurrentTimeState(props.currentTime)
    }, [props.timeValue])
    useEffect(() => {
        if (!props.autoPlayPlayer)
            setAudio(new Audio(audioUrl));
    }, [audioUrl])

    // , 'audio/mp3'
    useEffect(() => {
        if (autoPlayPlayer)
            handlePause();
    }, [props.pause])

    useEffect(() => {
        if (switchRecording) {
            setSwitchRecording(false)
            handlePause();
        }
        if (playing) {

            timerID.current = setInterval(() => {
                if (!audio.ended) {

                    props.currentTimeFunc(Math.ceil(audio.currentTime));
                } else {
                    clearInterval(timerID.current);
                }
            }, 1000);
        } else {
            clearInterval(timerID.current);
        }

    }, [playing, switchRecording]);

    const handleStart = () => {
        if (props.currentTime < 10) {
            props.currentTimeFunc(0)
            setCurrentTimeState(0);
        }
        else {
            props.currentTimeFunc(props.currentTime - 10)
            setCurrentTimeState(props.currentTime - 10);
        }
        props.setTimeValue()
    }

    const handlePause = () => {
        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            setPlaying(true)
            audio.play();
        }
    }

    const handleEnd = () => {
        if (props.currentTime + 10 > duration) {
            props.currentTimeFunc(duration)
            setCurrentTimeState(duration);
            setPlaying(false);
        }
        else {
            props.currentTimeFunc(props.currentTime + 10)
            setCurrentTimeState(props.currentTime + 10);
        }
        props.setTimeValue()
    }

    const playFromPlayer = () => {
        if (autoPlayPlayer) {
            props.switchWindowFunc()
            setPlaying(playing)


        }
    }


    return (
        <>
            <div className="wrap_player" style={{ padding: '17px' }}>
                <div className="d-flex justify-content-center align-item-center" >
                    {props.autoPlayPlayer ?
                        <div className="d-flex justify-content-start"
                            style={{ marginLeft: "-25%" }}>
                            <PlayerVolume
                                audio={props.audio}
                                volume={props.volume}
                                volumeFunc={props.volumeFunc}
                                mutedFunc={props.mutedFunc}
                                muted={props.muted} autoPlayPlayer={true}
                            />
                        </div>
                        : ''}
                    <Button onClick={handleStart} className="playButtons d-flex justify-content-center align-items-center"><SkipPreviousRounded style={{ color: '#4B0083' }} /></Button>
                    <Button onClick={() => { handlePause(); playFromPlayer(); }} className="playButtons pauseButton  d-flex justify-content-center align-items-center" >{playing ? <Pause /> : <PlayArrow />}</Button>
                    <Button onClick={handleEnd} className="playButtons d-flex justify-content-center align-items-center"><SkipNextRounded style={{ color: ' #4B0083' }} /></Button>
                </div>
                <div ></div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        // duration: state.audio.currentAudio.duration,
        // audioUrl: state.audio.currentAudio.audioUrl
    }
}

export default connect(mapStateToProps, null)(PlayerButtons);