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
// import { actions } from "../../../redux/actions";
import './PlayerProgress.css';
import PlayerVolume from './PlayerVolume';

const PrettoSlider = withStyles({
    root: {
        color: '#4B0083',
        height: 3,
    },
    thumb: {
        height: 12,
        width: 12,
        backgroundColor: '#FFF',
        border: '3.5px solid currentColor',
        marginTop: -8,
        //   marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 3,
        borderRadius: 4,
    },
    rail: {
        height: 3,
        borderRadius: 4,
        backgroundColor: '#CCCCCC'

    },
})(Slider);


function PlayerProgress(props) {
    const { duration, audioUrl } = props.audio;
    const audioFromState = useSelector(state => state.audio)
    let audioUrlTemp = audioFromState.playNowAudioId ? audioFromState.audioList.filter((a) => a._id === audioFromState.playNowAudioId)[0].audioUrl : ''
    const [audio, setAudio] = useState(new Audio(audioUrl && !props.autoPlayPlayer ? audioUrl : props.autoPlayPlayer ? audioUrlTemp : ''));
    const audioRange = React.useRef();
    const [currentTime, setCurrentTime] = useState(props.currentTime);
    const location = useLocation();
    const [volume, setVolume] = useState(props.volume);
    const [mutedAudio, setMutedAudio] = useState(props.muted)
    const [classPlayer,setClassPlayer]=useState("player")
    const [currentTimeState, setCurrentTimeState] = useState(props.currentTime);
    let URL = location.pathname;

    useEffect(() => {
        setCurrentTimeState(props.currentTime)
    }, [props.currentTime])

    useEffect(() => {
        changeVolume({}, props.volume)
    }, [props.volume])

    useEffect(() => {
        setMutedAudio(props.muted)
    }, props.muted)

    useEffect(()=>{
        if(props.autoPlayPlayer)
        setClassPlayer("screenSmallWidth")
        else
        setClassPlayer("player")
    })

    const muteVolume = (isMuted) => {
        props.mutedFunc(isMuted)
    }

    const changeCurrentTime = (e, newValue) => {
        props.currentTimeFunc(newValue)
        setCurrentTimeState(newValue);
        props.setTimeValue()
    }

    const changeVolume = (e, newValue) => {
        audio.volume = newValue;
        props.volumeFunc(newValue);
        props.mutedFunc(false)
        setVolume(true);
    }

    return (
        <>
        <div className="row">
            {!props.autoPlayPlayer ? <div className="col-2" style={{ paddingLeft: '10%', marginLeft: '1px' }}>
                <div className="d-flex justify-content-center align-item-center">
                    <PodcastSharingOption url={URL} id={props.id} />
                </div>
            </div> : <div className="col-2" style={{ paddingLeft: '10%', marginLeft: '1px', display: "none" }} />}
            <div className="col-8 PlayerProgressPL">
                <div className="wrap_range d-flex justify-content-center align-item-center " >
                    <span style={{ marginRight: '5px' }} className={classPlayer}>{secondsToHHMMSSFormat(Math.ceil(currentTimeState))}</span>
                    <PrettoSlider
                        type="range"
                        className="Wplayer tt"
                        value={currentTimeState}
                        min={0}
                        max={duration}
                        step={1}
                        ref={audioRange}
                        onChange={changeCurrentTime}
                    />
                    <span>{secondsToHHMMSSFormat(Math.ceil(duration)) || ''}</span>
                </div>
            </div>
            {!props.autoPlayPlayer ? <PlayerVolume audio={props.audio} volume={props.volume} volumeFunc={props.volumeFunc} mutedFunc={props.mutedFunc} muted={props.muted} autoPlayPlayer={false} /> : ''}
            <div></div>
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

export default connect(mapStateToProps, null)(PlayerProgress);