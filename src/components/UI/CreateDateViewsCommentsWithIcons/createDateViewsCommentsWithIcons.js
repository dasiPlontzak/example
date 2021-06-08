import React from 'react';
 import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "moment";
import './CreateDateViewsCommentsWithIcons.css';
 
export default function CreateDateSubscribersWithIcons(props) {
    const { createDate, views, comments } = props;
    const showCounterViews = useSelector(state => state.channelSettings.showCounterViews)

   
    return (
        <div className="wrap_details">
            <span>
                <FontAwesomeIcon
                    id='clock'
                    className="onHoverDetailsIcons"
                    icon={['far', 'clock']}
                ></FontAwesomeIcon>
                <span> {Moment(createDate).format("DD/MM/YYYY")}</span>
            </span>
            <span>
                <FontAwesomeIcon
                hidden={!showCounterViews}
                    id='eye'
                    className="onHoverDetailsIcons"
                    icon={['far', 'eye']}
                ></FontAwesomeIcon>
                {/* <span>{views}</span> */}
                <span hidden={!showCounterViews}>{views || "0"}</span>
            </span>
            {/* <span>
                  <FontAwesomeIcon
                    id='comment'
                    className="onHoverDetailsIcons"
                    icon={['far', 'comment']}
                ></FontAwesomeIcon>  
                <span>{comments}</span>
                <span>{15}</span>
            </span> */}
        </div>
    )
}