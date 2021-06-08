import React from 'react';
import ChannelSettings from './ChannelSettings.config';
import EditHeader from './EditHeader.config';
import EditSubscription from './EditSubscription.config';
import CardComponentConfig from "../cardComponentConfig/CardComponentConfig";

export default function ChannelConfiguration() {


    return (
        <>
           <CardComponentConfig
          eventKey={'Channel Settings'}
          component={ChannelSettings}
        />
        <CardComponentConfig
          eventKey={'Edit Header'}
          component={EditHeader}
        />
        <CardComponentConfig
          className="PositionA"
          eventKey={'Edit Subscription'}
          component={EditSubscription}
        />
        </>
    )
}