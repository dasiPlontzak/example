import React from 'react';
import { connect } from 'react-redux';
import './configurator.css'
import CollapseConfigurator from '../CollapseConfigurator/CollapseConfigurator';

function Configurator(props) {

    const { flagCon } = props

    return (
        <>
            {  flagCon &&
                <>

                        <div id="wrap-configurator" className="float-right">
                            <CollapseConfigurator {...props} />
                        </div>
                </>
            }
        </>
    )
}

export default connect(
    (state) => {
        return {
            flagCon: state.site.isOpenConfigurator,
        }
    }
)(Configurator)

