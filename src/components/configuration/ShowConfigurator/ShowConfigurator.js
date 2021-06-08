import React, { useEffect } from 'react';
import { connect } from "react-redux";
import TopFrame from '../top_frame/top_frame';
import { useParams } from "react-router-dom";
import './ShowConfigurator.css';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Lottie from "react-lottie";
import LoaderJson from '../../../assets/loader.json'
import { usePromiseTracker } from "react-promise-tracker";
import { actions } from '../../../redux/actions';

function ShowConfigurator(props) {

    const { promiseInProgress } = usePromiseTracker();
    const flagCon = props.flagCon;
    const params = useParams();
    const defaultAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderJson,
    };

    useEffect(() => {
        if (promiseInProgress)
            props.changeIsLoading(true)
        else
            props.changeIsLoading(false)
    }, [promiseInProgress])

    return (
        <div id="body" className="App">
            <BlockUi
                tag="div"
                blocking={props.isLoading}
                loader={
                    <Lottie
                        options={defaultAnimationOptions}
                        height={200} width={200}
                    />}>
                <TopFrame />
                <div className="row ShowConfiguratorWidth">
                    {props.children[1] ?
                        <>
                            <div className="col-md-10 col-sm-12 wrapStage ">
                                {React.cloneElement(props.children[0])}
                            </div>
                            <div className="col-md-2 col-sm-12 configurator float-md-right ShowConfiguratorColor StyCol ShowConfiguratorWith " >
                                {props.children[1] && React.cloneElement(props.children[1])}
                            </div>
                        </> :
                        <div className="col-md-12 col-sm-12 wrapStage ">
                            {React.cloneElement(props.children[0] ? props.children[0] : props.children, { ...params })}
                        </div>
                    }
                </div>
                <div id="bottom_configurtor" className="col-md-2 col-sm-12 StyCol">
                    {/* <div className="innerDivBottomConfigurator" >
                        <button className='btn'>
                            <span className="material-icons iconBottom" style={{ color: "#cac6c6" }}>
                                remove_red_eye
                        </span>
                        </button>
                    </div> */}
                </div>
            </BlockUi>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        flagCon: state.site.isOpenConfigurator,
        isLoading: state.site.isLoading
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeIsLoading: (e) => dispatch(actions.setIsLoading(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowConfigurator);