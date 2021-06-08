import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actions } from '../../../redux/actions';
import { connect } from 'react-redux';
import './ConfigComp.css';

function UploadImageFromConfigurator(props) {

    const changeImage = (e) => {
        const file = e.target.files[0];
        var url = URL.createObjectURL(file);
        props.changeImage(props.kind, url);
    }

    return (
        <div className="d-flex justify-content-center align-items-center divOnHover" >
         <input type="file" name="file" accept="image/*" id={`${props.kind}file`} className="inputfile" onChange={changeImage} />
            <label htmlFor={`${props.kind}file`}>
                <div >
                    <img src={props.imgSrc} id="img_homeImg" className="divUploadImage" alt="homeImage"></img>
                    <div className="iconDiv">
                        <FontAwesomeIcon
                            id='angle-right'
                            className='iconCloudUpload'
                            icon={['fas', 'cloud-upload-alt']}
                        ></FontAwesomeIcon>
                    </div>
                </div>
            </label>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        imgSrc: state.editHeader.image[ownProps.kind]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeImage: (key, imgUrl) =>
            dispatch(actions.setImage({ key: key, imgUrl: imgUrl })
            ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageFromConfigurator);