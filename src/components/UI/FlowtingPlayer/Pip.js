import React, { useState, useRef, useEffect } from "react";
import usePictureInPicture from "react-use-pip";
import tempV from '../../../assets/TempV.mp4'
import { MdPictureInPictureAlt } from 'react-icons/md'
import songTemp from '../../../assets/songtemp.mp3'
export default function ReactpipExemple(props) {




    const [active, setActive] = useState(true);
    const videoRef = useRef(null);
    const {
        isPictureInPictureActive,
        isPictureInPictureAvailable,
        togglePictureInPicture,
    } = usePictureInPicture(videoRef);
    const [displayVar, setDisplayVar] = useState("none")
    return (
        <div >
            <video ref={videoRef} autoPlay width="100%" style={{ display: displayVar }} >
                <source src={tempV} />
            </video>
            {isPictureInPictureAvailable && (
                <div style={{ cursor: "pointer" }}><MdPictureInPictureAlt size="7%"
                    onClick={() => {
                        togglePictureInPicture(!isPictureInPictureActive)
                        displayVar == "none" ? setDisplayVar("none") : setDisplayVar("none")
                    }
                    }
                >
                    {/* {isPictureInPictureActive ? "fg": "Enable"} Picture in Picture */}
                </MdPictureInPictureAlt></div>
            )}
        </div>
    );
}

