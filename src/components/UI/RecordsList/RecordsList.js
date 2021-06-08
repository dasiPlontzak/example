import React, { useEffect } from 'react';
import imgSrc from '../../../assets/microphone.jpg'
import { connect } from 'react-redux';
import { getChannelByName } from "../../../services/Channel.service";
import { actions } from "../../../redux/actions";
import './RecordsList.css';
function RecordsList(props) {

    useEffect(() => {
        //call here to ShowOnBoarding
        getChannelByName(props.initialAudios);
        console.log(props.audioList);
    }, []);
    return (
        <div style={{ backgroundColor: '#E8EAEC' }}>

            {props.audioList.map(audio => (

                <div className="row" key={audio._id}>
                    {/* <div className="col-md-3"> */}
                    {/* style={{background-image:{imgSrc}}} recordsList_img */}
                    <img src={imgSrc} className="col-md-4 recordsList_img" />
                    {/* </div> */}
                    <div className="col-md-8 recordsList_img">
                        <p className="recordsList_title">{audio.title}</p>
                        <p className="recordsList_description">{audio.description}</p>
                        <span style={{ color: '#AFAFAF', fontSize: '12px' }}>{audio.duration}</span>
                    </div>
                </div>
            ))}

        </div>
    );
}

const mapStateToProps = (r_state) => {
    return {
        audioList: r_state.audio.audioList ? r_state.audio.audioList : []
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        initialChannel: data => dispatch(actions.initialChannel(data)),
        initialAudios: data => dispatch(actions.initialAudios(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordsList);