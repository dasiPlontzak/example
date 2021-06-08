import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import {useSelector} from "react-redux"

/*UI imports*/
import "./App.css";
import HomePage from "../UI/HomePage";
import Promo from "../UI/Promo";
import AudioList from "../UI/AudioList/AudioList";
import Contact from "../UI/Contact";
import RecorderAudio from "../UI/RecorderAudio";
import ShowConfigurator from "../configuration/ShowConfigurator/ShowConfigurator";
import RecordDetails from "../UI/RecordDetails/RecordDetails";
import ShowRecordDetailsForUser from "../UI/ShowRecordDetailsForUser/ShowRecordDetailsForUser";
import AddRecord from "../UI/AddRecord/AddRecord";
import AddChannel from "../UI/AddChannel/AddChannel";
import Recording from "../UI/AddRecord/Recording";
import RecordDone from "../UI/AddRecord/RecordDone";
import RecordOrUpload from "../UI/AddRecord/RecordOrUpload";

/*firebase imports*/
import Signup from "../firebase/Signup";
import Login from "../firebase/Login";
import PrivateRoute from "../firebase/PrivateRoute";
import ForgotPassword from "../firebase/ForgotPassword";
import UpdateProfile from "../firebase/UpdateProfile";
import AuthProvider from "../../contexts/AuthContext";
import history from "../../config";

import "./App.css";

export default function App(props) {
  // const [lang, setLang] = useState("en");
  // let translations = new LocalizedStrings(localizations);
  // translations.setLanguage(lang);
  //use:
  //translations._props.name
  const translations = useSelector(state => state.site.translations);
  const lang = useSelector(state => state.site.lang);

  // useEffect(() => {
  //   translations.setLanguage(lang);
  // }, lang);

  return (
    <div>
      <Router history={history}>
        <AuthProvider>
          {/* <Provider store={store}> */}
          <Switch>
            {/* <PrivateRoute exact path="/" component={Dashboard} /> */}

            {/*Route for firebase */}
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            <Route path="/contact" component={Contact} />
            {/*Route for admin to channel with configurator */}
            <PrivateRoute
              path="/admin/:ChannelName/AddRecord/:isUpdateMode/insertDetails"
              component={() =>
                <ShowConfigurator>
                  <RecordDetails />
                </ShowConfigurator>
              }
            />
            <PrivateRoute
              path="/admin/:ChannelName/AddRecord/:isUpdateMode/:audioId?"
              component={() =>
                <ShowConfigurator>
                  <AddRecord >
                    <RecordOrUpload />
                    <Recording />
                  </AddRecord>
                </ShowConfigurator>
              }
            />
            <PrivateRoute path="/admin/:ChannelName/Promo" component={Promo} />
            <PrivateRoute
              path="/admin/:ChannelName/AddChannel/:isUpdateMode/:audioId?"
              component={() => (
                <ShowConfigurator>
                  <AddChannel />
                </ShowConfigurator>
              )}
            />
            <PrivateRoute
              exact
              path="/admin/:ChannelName"
              component={() => (
                <ShowConfigurator>
                  <AudioList />
                </ShowConfigurator>
              )}
            />
            <PrivateRoute
              exact
              path="/admin/:ChannelName/audio=:_id"
              component={() => (
                <ShowConfigurator>
                  <RecordDetails />
                </ShowConfigurator>
              )}
            />
            {/*Route for user to channel */}
            <PrivateRoute exact path="/:ChannelName" component={AudioList} />

            {/*Route for home page */}
            <Route
              path="/:ChannelName/audio=:_id"
              component={ShowRecordDetailsForUser}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

