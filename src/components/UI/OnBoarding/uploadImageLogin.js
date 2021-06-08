import React from 'react';
import * as Icons from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actions } from '../../../redux/actions';
import { connect } from 'react-redux';
import { useState } from "react";
import leadermic from '../../../assets/homeImageLogin.png'
import BackupTwoToneIcon from '@material-ui/icons/BackupTwoTone';

 
function UploadImageLogin(props) {
    const [img, setImg] = useState(false);
    const changeImage = (e) => {
        console.log(props.kind);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            props.changeImage(file, reader.result, props.kind);
        }
        setImg(true)

    }

    return (
        <div className="row">
            <input type="file" name="file" id={`${props.kind}file`} className="inputfilelogin" onChange={changeImage} />
            <label htmlFor={`${props.kind}file`} style={{ width: "230px" }}>

                <div className="divOnHover">
                    {!img &&
                        <img src={leadermic} alt="homeImageLogin.png" style={{ width: '50px' }} />}
                    {!img && " Upload Your Logo"}
                    {img && <img src={props.imgSrc} id="img_homeImg" className="divUploadImage" alt="homeImage"></img>}  
                    {img &&  <div className="iconDiv d-inline-flex d-flex justify-content-center align-items-center m-1 p-1 " hidden={false} style={{ width: "230px" }}>
                            <img src={leadermic} alt="homeImageLogin.png" style={{ width: '50px' }} />
                        Upload Your Logo
                    </div> }
                </div>
            </label>
        </div>

    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        imgSrc: state.editHeader[ownProps.kind]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeImage: (file, imgUrl, key) =>
            dispatch(actions.setImage({ file: file, key: key, imgUrl: imgUrl })
            ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageLogin);