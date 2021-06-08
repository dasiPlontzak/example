import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
 
import history from "../../config";
/*UI imports*/
import HomePage from "../UI/HomePage";
import Promo from "../UI/Promo";
import AudioList from "../UI/AudioList/AudioList";
import ShowConfigurator from "../configuration/ShowConfigurator/ShowConfigurator";
import RecordDetails from "../UI/RecordDetails/RecordDetails";
import ShowRecordDetailsForUser from "../UI/ShowRecordDetailsForUser/ShowRecordDetailsForUser";
import AddRecord from "../UI/AddRecord/AddRecord";
import Recording from "../UI/AddRecord/Recording";
import RecordOrUpload from "../UI/AddRecord/RecordOrUpload";
import ProtectedRoutes from "../App/ProtectedRoutes";
import imgCrop from "../UI/RecordDetails/Crop/indexCrop";
import ChannelConfiguration from '../configuration/configComp/ChannelConfiguration';
import ChannelsList from "../UI/ChannelsList/ChannelsList";
import PublishCancleButtons from "../configuration/configComp/PublishCancleButtons";
import Configurator from '../configuration/configurator/configurator';
import { actions } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { defaultConfigurationValues } from '../configuration/defaultConfigurationValues.js';
import "./App.css";

export default function App(props) {
  const dispatch = useDispatch()

  let TokenToString = document.cookie && document.cookie.includes("devJwt") ? document.cookie.split(";")
    .filter(s => s.includes('devJwt'))[0].split("=").pop() : null;

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      if (window.location.href.includes("/admin/")) {
        return (e.returnValue = "Are you sure you want to close?");
      }
    });

   
    // window.addEventListener('beforeunload', alertUser)
    // window.addEventListener('unload', () => alert("aaaaaaaaaaaaaaaaaaaaaa"))

    // return () => {
    //   window.removeEventListener('beforeunload', alertUser)
    //   window.removeEventListener('unload', () => alert("aaaaaaaaaaaaaaaaaaaaaa"))
    // }

    // window.onbeforeunload = confirmExit;
    // function confirmExit() {
    //   return "show warning";
    // }
  }, []);

  useEffect(async () => {
    const configurationValues = defaultConfigurationValues();
    console.log(configurationValues);
    await dispatch(actions.initialChannelSettingsConfiguration(configurationValues.channelSettings));
    await dispatch(actions.initialEditHeaderConfiguration(configurationValues.editHeader));
    await dispatch(actions.initialEditSubscribtionConfiguration(configurationValues.editSubscription));
  }, []);
 

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <div>
      <Router history={history}>
        <Switch>
          <ProtectedRoutes
            user={TokenToString}
            // exact
            path="/admin/:userName/channelsList"
            component={() => (
              <ShowConfigurator>
                <ChannelsList />

              </ShowConfigurator>

            )}
          />
          <ProtectedRoutes
            user={TokenToString}
            exact
            path="/admin/:userName/:ChannelName/AddRecord/:isUpdateMode/insertDetails/imgCrop"
            component={imgCrop}
          />
          <ProtectedRoutes
            user={TokenToString}
            path="/admin/:userName/:ChannelName/AddRecord/:isUpdateMode/insertDetails"
            component={() => (
              <ShowConfigurator>
                <RecordDetails />
                <Configurator>
                  <PublishCancleButtons />
                </Configurator>
              </ShowConfigurator>
            )}
          />
          <ProtectedRoutes
            user={TokenToString}
            path="/admin/:userName/:ChannelName/AddRecord/:isUpdateMode/:audioId?"
            component={() => (
              <ShowConfigurator>
                <AddRecord>
                  <RecordOrUpload />
                  <Recording />
                </AddRecord>
                <Configurator>
                  <PublishCancleButtons />
                </Configurator>
              </ShowConfigurator>

            )}
          />
          <ProtectedRoutes
            user={TokenToString}
            path="/admin/:userName/:ChannelName/Promo"
            component={Promo}
          />
          <ProtectedRoutes
            user={TokenToString}
            path="/admin/:userName/AddChannel"
            component={() => (
              <ShowConfigurator>
                <ChannelsList />
              </ShowConfigurator>
            )}
          />
          <Redirect
            from="/admin/:userName"
            to="/admin/:userName/channelsList"
            exact
            user={TokenToString}
          />
          {/* <ProtectedRoutes
            exact
            user={TokenToString}
            path="/admin/:userName/CreateNewChannel"
            component={() => (
              <ShowConfigurator>
                <AudioList />
              </ShowConfigurator>
            )}
          /> */}
          <ProtectedRoutes
            exact
            user={TokenToString}
            path="/admin/:userName/:ChannelName"
            component={() => (
              <ShowConfigurator>
                <AudioList />
                <Configurator>
                  <ChannelConfiguration />
                  <PublishCancleButtons />
                </Configurator>
              </ShowConfigurator>
            )}
          />

          <ProtectedRoutes
            exact
            user={TokenToString}
            path="/admin/:userName/:ChannelName/audio=:_id/imgCrop"
            component={imgCrop}
          />
          <ProtectedRoutes
            exact
            user={TokenToString}
            path="/admin/:userName/:ChannelName/audio=:_id"
            component={() => (
              <ShowConfigurator>
                <RecordDetails />
                <Configurator>
                  <PublishCancleButtons />
                </Configurator>
              </ShowConfigurator>

            )}
          />
          {/*Route for user to channel */}
          <Route
            exact
            user={TokenToString}
            path="/:ChannelName"
            component={AudioList}
          />
          {/*Route for home page */}
          <Route
            path="/:ChannelName/audio=:_id"
            component={ShowRecordDetailsForUser}
          />

          <Route path="/" component={HomePage} />
          {/* <Route path="/" >
            <Redirect to="/admin/SoundBoxChannel"></Redirect>
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}
