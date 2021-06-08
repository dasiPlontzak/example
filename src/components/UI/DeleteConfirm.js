import React from "react";
import { Modal, Button } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";

export default function DeleteConfirm(props) {
  const { show, handleShow, DeleteAudio } = props;

  return (
    <>
      <Modal show={show} onHide={handleShow} style={{ textAlign: "center" }}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="container">
              <Icons.Trash />
              <h3>Are you sure?</h3>
              <p>
                Do you really want to delete these record? This process cannot
                be undone.
              </p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleShow();
              DeleteAudio();
            }}
          >
            OK
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
