import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../redux/actions";
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import { Modal } from "react-bootstrap";
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage'
import { styles } from './styles'
import '../RecordDetails.css'

export const Demo = (props) => {
    const dispatch = useDispatch()
    const classes = props.classes
    const selectedImg = props.id
    const [crop, setCrop] = useState(props.crop)
    const [rotation, setRotation] = useState(props.rotation)
    const [zoom, setZoom] = useState(props.zoom)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(props.croppedAreaPixels)
    const [croppedImage, setCroppedImage] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const savaCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                selectedImg,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            if (props.source === "singleAudio") {
                dispatch(actions.changeCurrentAudioImage({ imgUrl: croppedImage }))
            }
            else {
                dispatch(actions.setImage({ imgUrl: croppedImage, key: "channel" }));
            }
            props.Cb(false, selectedImg, zoom, rotation, croppedAreaPixels, crop)

        }
        catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);
    function Show() {
        props.ShowCropperInClose(false)
    }

    return (
        <div className="Crop">
            <Modal.Dialog style={{ width: "100%", backgroundColor: "transparent !important" }}>
                <Modal.Header closeButton onHide={Show} ></Modal.Header>
                <Modal.Body style={{ backgroundColor: "transparent !important" }}>
                    <div style={{ backgroundColor: "transparent !important" }} className={classes.cropContainer}>
                        <Cropper
                            image={selectedImg}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={6 / 1.5}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className={classes.controls}>
                        <div
                            className={classes.sliderContainer}
                        >
                            <Typography
                                style={{ width: "56%" }}
                                variant="overline"
                                classes={{ root: classes.sliderLabel }}
                            >
                                Zoom
          </Typography>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                classes={{ root: classes.slider }}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                        <div className={classes.sliderContainer}>
                            <Typography
                                variant="overline"
                                classes={{ root: classes.sliderLabel }}
                                style={{ width: "56%" }}
                            >
                                Rotation
          </Typography>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                classes={{ root: classes.slider }}
                                onChange={(e, rotation) => setRotation(rotation)}
                            />
                        </div>
                    </div>
                    <ImgDialog img={croppedImage} onClose={onClose} />
                    {/* <Button
                        onClick={savaCroppedImage}
                        style={{ backgroundColor: "#4B0083", variant: "contained", color: "white" }}
                        classes={{ root: classes.cropButton }}
                    >
                        Save
        </Button> */}
                    <button
                        className="buttonCrop"
                        classes={{ root: classes.cropButton }}
                        style={{ backgroundColor: "white", variant: "contained", color: "#4B0083" }}>
                        <input type="file" name="file" accept="image/*" id={`currentAudioImgFiles`} className="inputfile inputfilecrop" onChange={(e) => props.changeImage(e.target.files[0])} />
                        <label htmlFor={`currentAudioImgFiles`} className=" inputfilecrop " style={{ width: "100%", margin: "0px !important" }}>
                     Upload Image
                         </label>
                    </button>
                    <button
                        onClick={savaCroppedImage}
                        style={{ backgroundColor: "#4B0083", variant: "contained", color: "white" }}
                        className="buttonCrop"
                        classes={{ root: classes.cropButton }}
                    >
                        Save
                    </button>

                </Modal.Body>
            </Modal.Dialog>

        </div>
    )
}
export default withStyles(styles)(Demo)

// const rootElement = document.getElementById('root')
// ReactDOM.render(<StyledDemo />, rootElement)

