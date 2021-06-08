import React, { useState, useEffect } from 'react';
import { VolumeUp, FavoriteRounded, GetApp, SkipPreviousRounded, PlayArrow, SkipNextRounded,Share } from '@material-ui/icons';
import SubScriber from './SubScriber';
import './SubScriber.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function Download(props) {
    const { url, title } = props;
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

    // const handleCopy = () => {
    //     let dummy = document.createElement("textarea");
    //     document.body.appendChild(dummy);
    //     dummy.value = url;
    //     dummy.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(dummy);
    // }
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
                overlay={
                    <Tooltip id="tooltip-top">
                        Download
                        </Tooltip>
                }>

                <GetApp
                    className={props.className}
                    
                    onClick={handleShow}
                ></GetApp>

            </OverlayTrigger>
            <Modal centered show={show} onHide={handleClose} dialogClassName="ModelSubScriber" >
                <Modal.Header closeButton  >
                </Modal.Header>
                <Modal.Body className="css-center"  >
                    <SubScriber/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}