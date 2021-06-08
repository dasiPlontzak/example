import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import './AddRecord.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


export default function AddRecord(props) {
    const history = useHistory();
    const [currentComponent, setCurrentComponent] = useState(0);
    const userName = useSelector((state) => state.user.userName);
    const currentChannel = useSelector(state => state.channel.currentChannel.name);

    const nextCurrentComponent = () => {
        setCurrentComponent(currentComponent + 1);
    }

    const currentPage = () => {
        const allChildProps = { nextCurrentComponent, routingChange };
        const child = React.Children.toArray(props.children)[currentComponent];
        return React.cloneElement(child, allChildProps);
    }
    const routingChange = (page) => {
        setCurrentComponent(page)
    }
    const goMyChannel = (page) => {
        history.push(`/admin/${userName}/${currentChannel}`)
    }
     
    return (
        <div className="backgroundImage" >

            <div className="d-flex align-items-start MyChannel"
                onClick={goMyChannel}
            >
                {currentComponent === 0 && <ArrowBackIosIcon className="MyChannelIcn" />}
                {currentComponent === 0 ? "My channel" : ""}
            </div>
            <div className="d-flex align-items-start flex-column">
                <div className="wrap_body">
                    {currentPage(currentComponent)}
                </div>
            </div>
        </div>
    );
}

