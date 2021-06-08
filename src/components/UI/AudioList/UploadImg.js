import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actions } from '../../../redux/actions';
import { connect } from 'react-redux';
function UploadImageFromConfigurator(props) {

    const changeImage = (file, img) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                props.changeImage(file, reader.result, img)
            }
        }
    }
    return (
        <>
            <div className="d-flex">
                <div className="currentAudioUploadImgOnHover" style={{ paddingTop: "3%", zIndex: "3" }}  >
                    <img src={props.logoSrc} style={{ height: "57px" }} ></img>
                    <div className="iconDiv" >
                        <input type="file" name="file" accept="image/*" id={`channelLogofile`} className="inputfile" onChange={(e) => changeImage(e.target.files[0], 'logo')} />
                        <label htmlFor={`channelLogofile`} style={{ marginTop: "3% !important", width: "20%", zIndex: "3" }}>
                            <FontAwesomeIcon
                                style={{ fontSize: "large" }}
                                id='angle-right'
                                className='iconCloudUpload'
                                icon={['fas', 'cloud-upload-alt']}
                            ></FontAwesomeIcon>
                        </label>
                    </div>
                </div>

            </div>
        </>
    );
}

const mapStateToProps = (r_state) => {
    return {
        logoSrc: r_state.editHeader.image.logo,
        homeImgSrc: r_state.editHeader.image.channel,
    };
};

const mapDispatchToProps = (dispatch) => ({


    changeImage: (file, imgUrl, key) => dispatch(actions.setImage({ file: file, key: key, imgUrl: imgUrl })),


});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageFromConfigurator);