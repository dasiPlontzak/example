import React, { useState, useEffect, useRef } from "react";
import "./InputCopyText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Overlay } from "react-bootstrap";

export default function InputCopyText(props) {
  const url = props.url;
  const [showCopy, setShowCopy] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleCopy = () => {
    setShowCopy(!showCopy);
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };

//   useEffect(
//     function () {
//       if (url === "") {
//         console.error("Please enter URL.");
//         handleClose();
//         return;
//       }
//     },
//     [show]
//   );

  return (
    <>
      <div className="input-group input-group-sm">
        <input
          type="text"
          className="form-control"
          placeholder= {url} 
          aria-describedby="basic-addon2"
          disabled
        />
        <div className="input-group-append">
          <Overlay target={target.current} show={showCopy} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Link Copied
              </Tooltip>
            )}
          </Overlay>
          <span
            ref={target}
            onClick={handleCopy}
            onMouseLeave={() => {
              setShowCopy(null);
            }}
            className="input-group-text"
            id="basic-addon2"
          >
            <FontAwesomeIcon icon={["fas", "link"]} />
          </span>
        </div>
        <div></div>
      </div>
    </>
  );
}
