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


function PlayerVolume(props) {
    const { duration, audioUrl } = props.audio;
    const audioFromState = useSelector(state => state.audio)
    let audioUrlTemp = audioFromState.playNowAudioId ? audioFromState.audioList.filter((a) => a._id === audioFromState.playNowAudioId)[0].audioUrl : ''
    const [audio, setAudio] = useState(new Audio(audioUrl && !props.autoPlayPlayer ? audioUrl : props.autoPlayPlayer ? audioUrlTemp : ''));
    const audioRange = React.useRef();
    const [currentTime, setCurrentTime] = useState(props.currentTime);
    const location = useLocation();
    const [volume, setVolume] = useState(props.volume);
    const [mutedAudio, setMutedAudio] = useState(props.muted)
    const [classPlayer, setClassPlayer] = useState("player")
    let URL = location.pathname;



    useEffect(() => {
        changeVolume({}, props.volume)
    }, [props.volume])

    useEffect(() => {
        setMutedAudio(props.muted)
    }, props.muted)

    useEffect(() => {
        if (props.autoPlayPlayer) {
           
            setClassPlayer("screenSmall")
        }
        else
            setClassPlayer("player")
    })

    const muteVolume = (isMuted) => {
        props.mutedFunc(isMuted)
    }



    const changeVolume = (e, newValue) => {
        audio.volume = newValue;
        props.volumeFunc(newValue);
        props.mutedFunc(false)
        setVolume(true);
    }

    return (
        <>

            <div className="wrap_volume col-3 miK" >
                {

                    !props.muted ?
                        <VolumeUp className={classPlayer + " iconsButtons Iconspik"}
                            onClick={() => muteVolume(true)} />
                        :
                        <VolumeOff className={classPlayer + " iconsButtons Iconspik"}
                            onClick={() => { muteVolume(false) }} />

                }
                <PrettoSlider
                    className={classPlayer+" volumeInput tt"}
                    // className="volumeInput tt"
                    type="range"
                    defaultValue={audio.volume}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={changeVolume}
                />
            </div>
            <div ></div>

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        // duration: state.audio.currentAudio.duration,
        // audioUrl: state.audio.currentAudio.audioUrl
    }
}

export default connect(mapStateToProps, null)(PlayerVolume);