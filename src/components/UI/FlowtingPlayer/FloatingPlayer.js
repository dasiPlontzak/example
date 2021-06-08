import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { actions } from '../../../redux/actions';
import { Modal, Button } from 'react-bootstrap'
import { useHistory, useLocation, useParams, } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import Arrow from '../../../assets/arrow.png'
import ArrowClose from '../../../assets/arrowClose.png'
import Close from '../../../assets/close.png'
import Player from '../Player/Player';
import DragM from "dragm";
import ProgressProvider from "./ProgressProvider";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { IoPlay } from 'react-icons/io5';
import { BsArrowRepeat } from 'react-icons/bs'
import { IoIosPause } from 'react-icons/io'
import { duration } from "moment";
import PlayerProgress from '../PlayerComponents/PlayerProgress'
import PlayerButtons from '../PlayerComponents/PlayerButtons'
import PlayerVolume from '../PlayerComponents/PlayerVolume'
import 'react-circular-progressbar/dist/styles.css';
import '../SingleAudio/SingleAudio.css';
import './FloatingPlayer.css'

function FloatingPlayer(props) {
    const [valueEnd, setValueEnd] = useState(0);
    const [currentAudio, setCurrentAudio] = useState(props.audio ? props.audio : {})
    const [playing, setPlaying] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [hideComponent, setHideComponent] = useState("none")
    const [marginCss, setMarginCss] = useState("70%")
    const [autoPlayPlayer, setAutoPlayPlayer] = useState(true)
    const [arrow, setArrow] = useState(Arrow);
    const [overFlow, setOverFlow] = useState("initial")
    const [switchWindow, setSwitchWindow] = useState(false);
    const [pause, setPause] = useState(true);
    const [closeButton, setCloseButton] = useState(false)
    const [SwitchIcon, setSwitchIcon] = useState(true);
    const [displayTextPlay, setDisplayTextPlay] = useState("block")
    const [loopAudio, setLoopAudio] = useState(false)
    const timerID = React.useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();
    let plus = 100 / props.audio.duration;
    const audioFromState = useSelector(state => state.audio)
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(true);
    const [mutedAudio, setMutedAudio] = useState(false)
    const [endAudio, setEndAudio] = useState(false);
    const [marginLeftTitle, setMarginLeftTitle] = useState("33%")
    const [widthWrapper, setWidthWrapper] = useState("23%")
    const [timeValue, setTimeValue] = useState(0)
    const [playerFromFullScreen, setPlayerFromFullScreen] = useState(false)
    const [valueEndChangePlayer, setValueEndChangePlayer] = useState(false)
    const [heightScreenFull,setHeightScreenFull]=useState("auto")
    const [heightScreenFullDes,setHeightScreenFullDes]=useState("auto")
    useEffect(() => {
        if (endAudio) {
            setEndAudio(false)
            setPause(false);
            setValueEnd(0)
            setPlaying(false);
            setSwitchIcon(false);
        }
    }, [endAudio])

    useEffect(() => {

        handlePause()

    }, [playerFromFullScreen])


    useEffect(() => {
        return () => {
            dispatch(actions.setSmallScreen(true))
        };
    }, [])

    const changeCurrentTime = (childData) => {
        setCurrentTime(childData)
    }
    const changeEndAudio = (childData) => {
        setEndAudio(true)
    }
    const changeVolume = (childDate) => {
        setVolume(childDate);
    }
    const changeMuted = (childDate) => {
        setMutedAudio(childDate);
    }
    const changeTimeValue = () => {
        setValueEndChangePlayer(true)
        setTimeValue(v => ++v)
    }
    useEffect(() => {
        if (valueEndChangePlayer) {
            let tempValue = plus * currentTime;
            setValueEnd(tempValue)
            setValueEndChangePlayer(false)
        }
    }, [currentTime])

    useEffect(() => {
        if (!pause && closeButton) {
            dispatch(actions.setSmallScreen(true))
        }

        if (valueEnd >= 100) {
            setSwitchIcon(false);
            clearInterval(timerID.current)
        }
    })



    useEffect(() => {
       

            if (pause || switchWindow) {

                timerID.current = setInterval(() => {

                    if (valueEnd < 100) {
                        setValueEnd(valueEnd => valueEnd + plus);
                    }
                    else {
                        clearInterval(timerID.current)
                    }

                }, 1000);
            } else {
                clearInterval(timerID.current);
                setSwitchIcon(false);
            }
      

    }, [pause, switchWindow])

    useEffect(() => {
        plus = 100 / props.audio.duration;
        if (valueEnd >= 100) {
            setPause(false);
            setSwitchWindow(true)
            setValueEnd(0)
            setSwitchIcon(true);
        }
        else {
            setValueEnd(0);
            setPause(true);
            setSwitchIcon(true);
        }

    }, [audioFromState.playNowAudioId])

    const handlePause = () => {

        if (valueEnd >= 100) {
            setEndAudio(false)
            setPause(false);
            setValueEnd(0)
            setSwitchIcon(true);
        }

        if (playing) {
            setPause(false);
            setPlaying(false);
            setSwitchIcon(false);
        } else {

            setPause(true);
            setSwitchIcon(true);
            setPlaying(true);
        }


    }
    function changeLoop() {
        setLoopAudio(!loopAudio)
    }
    function closeWindow() {
        setPause(false);
        setCloseButton(true)
    }
    function fullScreenToogle() {
        setFullScreen(!fullScreen);
        if (fullScreen) {
            setMarginCss("70%");
            setHideComponent("none")
            setDisplayTextPlay("block")
            setArrow(Arrow)
            setOverFlow("initial")
            setMarginLeftTitle("33%")
            setWidthWrapper("23%")
            setHeightScreenFull("auto")
            setHeightScreenFullDes("auto")
        }
        else {
            setMarginCss("7%")
            setMarginLeftTitle("3%")
            setDisplayTextPlay("none")
            setHideComponent("inline-block")
            setWidthWrapper("19%")
            setArrow(ArrowClose)
            // setOverFlow("auto")
            setHeightScreenFull("41vw")
            setHeightScreenFullDes("36vh")
        }

    }


    function playFromPlayerFunc() {

        if (!playerFromFullScreen) {
            setPause(true);
            setSwitchIcon(true);
            setPlayerFromFullScreen(true);

        }
        else {
            setPause(false);
            setSwitchIcon(false);
            setPlayerFromFullScreen(false)
        }


    }

    return (
        <>

            <DragM >
                <Modal.Dialog style={{ height: "10%", top: marginCss, position: "fixed", width: widthWrapper, overflow: overFlow, zIndex: "3" }} className="shadow-lg"  >
                    <div className="container WrapperScreenSmall" style={{height:heightScreenFull}}>

                        <Modal.Header >
                            <img src={Close} onClick={closeWindow} width="4%" height="4%" className="d-flex justify-content-start imgArrow" />

                            <img src={arrow} onClick={fullScreenToogle} width="4%" height="4%" className="d-flex justify-content-start imgArrow" />

                        </Modal.Header>
                        {hideComponent == "none" ? <div className="d-inline p-2 ">
                            <div className="imgBackGround" onClick={handlePause} style={{ backgroundImage: `url(${props.audio.img})`, borderRadius: "50%", backgroundSize: "100% 100%", width: "25%", marginLeft: "3% !important", marginBottom: "6% !important" }}>
                                <CircularProgressbarWithChildren >
                                    <ProgressProvider valueStart={0} valueEnd={valueEnd}>
                                        {value => <CircularProgressbar value={value} />}
                                    </ProgressProvider>

                                </CircularProgressbarWithChildren>

                            </div>

                            {SwitchIcon ? <IoIosPause /> : <IoPlay />}

                        </div>

                            : <div><img src={props.audio.img} alt="imgPlay" className="img-thumbnail imgPlay" width="100%" height="16vh" style={{ border: "none", marginTop: "3%",height:"20vh" }}></img></div>
                        }
                        <p className="card-text" style={{ marginLeft: "-4%", fontSize: "medium", marginTop: "-29%", display: displayTextPlay }}>Playing Now</p>
                        <h6 className="card-title titleClass" style={{ marginLeft: marginLeftTitle }}>{props.audio.title}</h6>

                        {props.audio.audioUrl != undefined ? <div style={{ display: hideComponent }} className="wrapperFloating">
                            <p className="card-text descriptionP" style={{ marginLeft: "2%", textAlign: "justify", width: "48%" ,height:heightScreenFullDes,overflow: "scroll"}}>{props.audio.description}</p>


                            <PlayerButtons
                                audio={props.audio}
                                currentTimeFunc={changeCurrentTime}
                                loopAudio={loopAudio}
                                currentTime={currentTime}
                                volume={volume}
                                volumeFunc={changeVolume}
                                mutedFunc={changeMuted}
                                muted={mutedAudio}
                                autoPlayPlayer={true}
                                pause={pause}
                                endAudioFunc={changeEndAudio}
                                switchWindowFunc={playFromPlayerFunc}
                                timeValue={timeValue}
                                setTimeValue={changeTimeValue}
                            />
                            <div className="FloatingPlayerRepeat"> <BsArrowRepeat color="purple" fontSize="1.2em" onClick={changeLoop} /></div>
                            <br />
                            <div className="d-flex justify-content-center align-item-center" >
                                <PlayerProgress
                                    audio={props.audio}
                                    currentTimeFunc={changeCurrentTime}
                                    currentTime={currentTime}
                                    volume={volume}
                                    volumeFunc={changeVolume}
                                    mutedFunc={changeMuted}
                                    muted={mutedAudio}
                                    autoPlayPlayer={true}
                                    setTimeValue={changeTimeValue}
                                />
                            </div>

                        </div> : ''}

                    </div>

                </Modal.Dialog>
            </DragM>
        </>

    )

}

const mapStateToProps = (r_state, ownProps) => {
    return {
        audio: r_state.audio.audioList.filter((a) => a._id === ownProps._id)[0],
    };
};

export default connect(mapStateToProps, null)(FloatingPlayer);
