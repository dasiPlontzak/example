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
import PlayerProgress from '../PlayerComponents/PlayerProgress'
import PlayerButtons from '../PlayerComponents/PlayerButtons'
import './Player.css';

const PrettoSlider = withStyles({
    root: {
        color: '#4B0083',
        height: 3
    },
    thumb: {
        height: 12,
        width: 12,
        backgroundColor: '#FFF',
        border: '3.5px solid currentColor',

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


function Player(props) {


    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(true);
    const [mutedAudio, setMutedAudio] = useState(false)
    const [timeValue, setTimeValue] = useState(0)

    const changeCurrentTime = (childData) => {
        // alert(childData)
        setCurrentTime(childData)
    }
    const changeVolume = (childDate) => {
        setVolume(childDate);
        //   setMutedAudio(false)
    }
    const changeMuted = (childDate) => {
        setMutedAudio(childDate);
        //   setVolume(!volume)
    }

    const changeTimeValue = () => {
        setTimeValue(v => ++v)
    }

    return (
        <>
            <div className="wrap_player" style={{ padding: '17px' }}>


                <PlayerProgress
                    audio={props.audio}
                    currentTimeFunc={changeCurrentTime}
                    currentTime={currentTime}
                    volume={volume}
                    volumeFunc={changeVolume}
                    mutedFunc={changeMuted}
                    muted={mutedAudio}
                    autoPlayPlayer={false}
                    setTimeValue={changeTimeValue}
                />
                {/* <PlayerVolume audio={props.audio} volume={volume} volumeFunc={changeVolume} mutedFunc={changeMuted} muted={mutedAudio} autoPlayPlayer={false}/> */}
                <div className="d-flex justify-content-center align-item-center" >
                    <PlayerButtons
                        audio={props.audio}
                        currentTime={currentTime}
                        currentTimeFunc={changeCurrentTime}
                        volume={volume}
                        volumeFunc={changeVolume}
                        mutedFunc={changeMuted}
                        muted={mutedAudio}
                        autoPlayPlayer={false}
                        timeValue={timeValue}
                        setTimeValue={changeTimeValue}
                    />
                </div>
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

export default connect(mapStateToProps, null)(Player);