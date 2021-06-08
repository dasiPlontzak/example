import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from './../../../assets/logo.svg'
import { actions } from '../../../redux/actions';
// import PodcastSharingOption from '../SingleAudio/Option/podcastSharingOption/podcastSharingOption';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from '@leadercodes/leader-header';
import '../../App/App.css';
import './top_frame.css'
import InputCopyText from '../../UI/InputCopyText/InputCopyText'

function Top_frame(props) {
    const userName = useSelector(state => state.user.userName);

    const [error, setError] = useState("");
    // const { currentUser, logout } = useAuth();
    // const { logout } = useAuth();
    const history = useHistory();
    async function handleLogout() {
        setError("");
        try {
            // await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }
    return (
        <div id="top_frame" className="row d-flex justify-content-between align-items-center mx-0" >
            <div className="d-flex flex-row col-4">
                <a id="leader_logo" href="\" className="d-flex">
                    <img src={logo} id="img_logo" className="imgLogo" alt="logo"></img>
                </a>
                <a className="AButtonCon" onClick={()=>history.push(`/admin/${userName}/channelsList`)}> Channels </a>
            {/*<a className="AButtonCon" href="https://soundbox.me/">  Subscribers </a>
            <a className="AButtonCon" href="https://soundbox.me/"> Statistics </a> */}
        </div>
      
            {/* <p className="userLoginDisplay">{userName}.Soundbox.me</p> */ }
            <div><InputCopyText url={window.location.href}/></div>
            <div className="mr-3 col-4">
                {/* <a href="#" onClick={handleLogout} > */}
                <User appName={'soundBox'} userName={userName} />‏

                {/* <User className="iconGroup" appName={'soundBox'} userName={'Ayala Hillel'} style={{ background: ['fas', 'user-circle'] }} /> */}
                {/* <FontAwesomeIcon
                        className="iconGroup"
                        icon={['fas', 'user-circle']}
                    >
                    </FontAwesomeIcon> */}
                {/* </a> */}
                {/* <FontAwesomeIcon
                    id="thumbtack"
                    onClick={() => props.changeFlagThumbtack(!props.thumbtack)}
                    className={props.thumbtack ? "rotateIcon iconGroup" : " iconGroup"}
                    icon={['fas', 'thumbtack']}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    onClick={!props.thumbtack && (() => props.changeFlagConfigurator(!props.flagCon))}
                    className="menuIcon iconGroup"
                    icon={['fas', 'bars']}
                ></FontAwesomeIcon> */}

            </div>
        </div >
    )
}
export default connect(
    (state) => {
        return {
            flagCon: state.site.isOpenConfigurator,
            thumbtack: state.site.thumbtack
        }
    },
    (dispatch) => {
        return {
            changeFlagConfigurator: (newFlag) => dispatch(actions.setIsOpenCon(newFlag)),
            changeFlagThumbtack: (newFlag) => dispatch(actions.setThumbtack(newFlag)),
        }
    }
)(Top_frame)
