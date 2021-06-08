import React, { useState } from "react";
import * as Icons from "react-bootstrap-icons";
import { deleteAudio } from "../../services/Audio.service";
import { connect } from "react-redux";
import { renderTooltip } from '../../services/style.service';
import { OverlayTrigger } from "react-bootstrap";
import DeleteConfirm from "./DeleteConfirm";
import { actions } from '../../redux/actions';


function DeleteAudio(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  const DeleteAudio = () => {
    deleteAudio(props.updateAudioListAfterDelete, props.audioId);
  };

  return (
    <>
      <OverlayTrigger
        delay={{ show: 250, hide: 400 }}
        overlay={(e) => renderTooltip(e, 'delete')}
      >
        <button
          className="btn btn-outline-info"
          onClick={handleShow}
          data-toggle="modal"
          data-target="#exampleModal"
          type="button"
        >
          <Icons.Trash />
        </button>
      </OverlayTrigger>
      <DeleteConfirm show={show} handleShow={handleShow} DeleteAudio={DeleteAudio} />
    </>
  );
}

export default connect(undefined, (dispatch) => {
  return {
    updateAudioListAfterDelete: (data) => {
      dispatch(actions.deleteAudio(data));
    },
  };
})(DeleteAudio);
