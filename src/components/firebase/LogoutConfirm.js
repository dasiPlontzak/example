import React from "react";
import { Modal, Button } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";

export default function LogOutConfirm(props) {
    const { show, handleShow, handleLogout } = props;

    return (
        <>
            <Modal show={show} onHide={handleShow} style={{ textAlign: "center" }}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="container">
                            <Icons.Trash />
                            <h3> Are you sure?</h3>
                            <p>
                                Do you really want to logout?
                              </p>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleShow();
                            handleLogout();
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

