import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import audioReducer from "./reducers/audio.reducer";
// import { composeWithDevTools } from "redux-devtools-extension";
import siteReducer from "./reducers/configurationReducers/site.reducer";
import channelSettingsReducer from "./reducers/configurationReducers/channelSettings.reducer";
import editHeaderReducer from "./reducers/configurationReducers/editHeader.reducer";
import editSubscriptionReducer from "./reducers/configurationReducers/editSubscription.reducer"
import userReducer from "./reducers/userReducer";
// import {
//   onAuthStateChanged,
//   checkPermission,
//   getAccessToken,
//   setJwt,
//   checkUserName,
//   getUserNameByEmail,
// } from "./loginMiddleware";
import { actions } from "./actions";
import channelReducer from "./reducers/channel.reducer";
import {extractJwt} from "./loginLeaderMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  site: siteReducer,
  audio: audioReducer,
  channelSettings: channelSettingsReducer,
  editHeader: editHeaderReducer,
  channel:channelReducer,
  editSubscription: editSubscriptionReducer,
  user: userReducer,
  // form: formReducer.plugin({
  //   addChannel: (state, action) => {
  //     switch (action.type) {
  //       case "ADD_CHANNEL_SAVE_ACCESS":
  //         return undefined;
  //       default:
  //         return state;
  //     }
  //   }
  // })
});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      extractJwt,
      // onAuthStateChanged,
      // getAccessToken,
      // checkPermission,
      // checkUserName,
      // setJwt,
      // getUserNameByEmail
    )
  )
  //   composeWithDevTools()
);

window.store = store;
export default store;

store.dispatch(actions.extractJwt());

//store.dispatch(actions.onAuthStateChanged());
