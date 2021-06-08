import React from 'react';
import { Card, Accordion } from 'react-bootstrap';
import { actions } from '../../../redux/actions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './CardComponentConfig.css';

function CardComponentConfig(props) {
    return (
        <Card className= "card" >
            <Accordion.Toggle as={Card.Header} eventKey={props.eventKey} style={{ width: "100% !important" }}
           className= {props.eventKey === props.currentComponent ? "CardColor" : ""}
             onClick={() => props.currentComponent == props.eventKey ? props.changeCurrentComponent('') : props.changeCurrentComponent(props.eventKey)}>
                <div className="d-flex justify-content-between align-items-center" >
                    {/* d-flex flex-row justify-content-between className="col-md-10" className="col-md-2"*/}
                    <div  >
                        {props.eventKey}
                        
                    </div>
                    <div >
                        <FontAwesomeIcon
                            id='angle-right'
                            className={props.eventKey === props.currentComponent ? "rotateArrowIconRight iconGroup" : "rotateArrowIconLeft iconGroup"}
                            icon={['fas', 'angle-right']}
                        ></FontAwesomeIcon>
                    </div>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.eventKey} className="accordion">
                <div className="ml-3 WidthCardDiv">
                    <props.component />
                </div>
            </Accordion.Collapse>
        </Card >

    );
}
const mapStateToProps = (state) => {
    return {
        currentComponent: state.site.currentComponent
    }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    changeCurrentComponent: (e) => dispatch(actions.setCurrentComponent(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(CardComponentConfig);
