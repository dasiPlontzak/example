import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { actions } from "../../../redux/actions";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './OnBoarding.css'

function MainModal(props) {
  const history = useHistory();
  const { show, handleShow } = props;
  const [currentComponent, setCurrentComponent] = useState(0);
  const numOfPages = React.Children.count(props.children);

  const step1Schema = Yup.object().shape({
    adminName: Yup.string().required("Required"),
    adminEmail: Yup.string().required("Required"),
  });
  const step2Schema = Yup.object().shape({
    channelName: Yup.string().required(""),
  });
  const onBoardingFormSchema = [null, step1Schema, step2Schema];

  const handleSubmit = (formValues) => {
    console.log("submitttttt");
    console.log(formValues);
    props.setAdminDetails(formValues);
  };

  const handleCloseModal = () => {
    setCurrentComponent(0);
    handleShow();
  }
  // exit in skip mode or complete modal
  const exitOnBoarding = (values) => {
    handleShow();
    const channelName = values.channelName ? values.channelName : props.channelName;
    history.push(`/admin/${channelName}`);
  }

  const nextClick = (values) => {
    if (currentComponent < numOfPages - 1) {
      setCurrentComponent(currentComponent + 1);
    } else {
      exitOnBoarding(values);
    }
    if (currentComponent === numOfPages - 2) handleSubmit(values);
  };

  const currentPage = (
    errors,
    values,
    handleChange,
    handleBlur,
    isValid,
    touched
  ) => {
    const allChildProps = {
      errors,
      values,
      handleChange,
      handleBlur,
      isValid,
      touched,
    };
    const child = React.Children.toArray(props.children)[currentComponent];
    return React.cloneElement(child, allChildProps);
  };

  return (
    <Modal show={show} onHide={handleCloseModal} style={{ maxHeight: "90vh", borderRadius: "0px !important" }}>
      <Modal.Header style={{ borderBottom: "0px" }} closeButton  >
        {/* <Modal.Title> */}
         <button
          style={{ backgroundColor: "white", border: "0px" }}
           hidden={currentComponent === 0}
          onClick={() => setCurrentComponent(currentComponent - 1)}
        >
          <FontAwesomeIcon
            style={{ zIndex: "8" }}
            disabled={currentComponent === 0}
            onClick={() => setCurrentComponent(currentComponent - 1)}
             className="textField m-1"
            id='angle-left'
            icon={['fas', 'angle-left']}
          ></FontAwesomeIcon>
        </button>
        {/* </Modal.Title> */}
      </Modal.Header>
      <Formik
        initialValues={{
          adminName: props.currentAdmin.name || '',
          adminEmail: props.currentAdmin.email,
          podcastName: "",
          channelName: '',
          brandColor: ''
        }}
        validationSchema={onBoardingFormSchema[currentComponent]}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          isValid,
          touched,
        }) => (
          <Form className="align-items-center">
            <Modal.Body className="OnBoardingMain">
              <div>
                {show
                  ? currentPage(
                    errors,
                    values,
                    handleChange,
                    handleBlur,
                    isValid,
                    touched
                  )
                  : ""}
              </div>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "0px" }}>
              <Button
                style={{ backgroundColor: "#4B0083", border: "0px", borderRadius: "0px", boxShadow: "none" }}
                disabled={!isValid}
                onClick={() => nextClick(values)}
              >
                {currentComponent === 0 ? "Go!" : "Next"}
              </Button>
              <Button
                style={{ backgroundColor: "white", color: "#959595", border: "0px", display: "block" }}
                disabled={!isValid}
                onClick={() => exitOnBoarding(values)}
              >
                {currentComponent === 0 ? "" : "Skip"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    channelName: state.site.channelName,
    currentAdmin: state.site.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAdminDetails: (formValues) => {
      dispatch(actions.setAdminDetails(formValues));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainModal);