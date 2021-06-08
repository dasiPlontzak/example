import React, { useState, useEffect, useRef } from 'react';
import Parser from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Share } from '@material-ui/icons';
import { Modal, OverlayTrigger, Tooltip, Overlay } from 'react-bootstrap';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import './Sharing.css'
import {
    InstapaperShareButton,
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
import { Button } from 'bootstrap';
export default function Sharing(props) {
    const url = props.url;
    const title = props.title;
    const [showCopy, setShowCopy] = useState(false);
    const target = useRef(null);
    const [show, setShow] = useState(false);
    const icons = {
        shareIcon: `<svg width="0.8em" height="0.8em" viewBox="0 0 16 16" className="bi bi-share-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
      </svg>`,
        copyIcon: `<svg width="0.8em" height="0.8em"
      viewBox="0 0 16 16"
      className="bi bi-files"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
<path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>
</svg>`
    };

    const handleCopy = () => {
        setShowCopy(!showCopy)
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(function () {
        if (url === '') {
            console.error("Please enter URL.");
            handleClose();
            return;
        }
    }, [show]);
    return (
        <>
            <OverlayTrigger key="top"
                placement="top"
                overlay={<Tooltip id="tooltip-top">Share</Tooltip>}>
                <ShareRoundedIcon
                    // id='sharing'
                    className={props.className}
                    // icon={['fas', 'share-alt']}
                    // variant="outline-dark"
                    onClick={handleShow}
                ></ShareRoundedIcon>
            </OverlayTrigger>
            <Modal centered show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    {/* <Modal.Title>{url}</Modal.Title> */}
                </Modal.Header>
                <Modal.Title closeButton></Modal.Title>
                <Modal.Body className="css-center" >

                    <div>
                        <div><h5>Let your friends enjoy too!<br /> <br /></h5> </div>

                        <div className="d-flex align-items-center justify-content-center ">
                            <input className="InstegaramInput" type="text" value={url} />

                            <Overlay target={target.current} show={showCopy} placement="top">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                       Link Copied
                                    </Tooltip>
                                )}
                            </Overlay>

                            <button ref={target} className="InstegaramInputButton" onMouseLeave={()=>{setShowCopy(null)}} onClick={handleCopy}>Copy <FileCopyOutlinedIcon /></button></div>


                        <div className="d-flex justify-content-center align-item-center">
                            <InstapaperShareButton className="InstagramBoutton Instagram" url={url} title={title}><InstagramIcon />Instagram</InstapaperShareButton>
                            <FacebookShareButton className="InstagramBoutton Facebook" url={url} title={title} ><FacebookIcon />Facebook</FacebookShareButton>
                            <WhatsappShareButton className="InstagramBoutton WhatsApp" url={url} title={title} ><WhatsAppIcon />WhatsApp</WhatsappShareButton>
                            <TwitterShareButton className="InstagramBoutton Twitter" url={url} title={title} ><TwitterIcon />Twitter</TwitterShareButton>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}