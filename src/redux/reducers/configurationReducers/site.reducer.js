import produce from 'immer';
import createReducer from '../reducerUtils'
import LocalizedStrings from "react-localization";
import localizations from "../../../localization/en.js";

const initialState = {
    isOpenConfigurator: true,
    thumbtack: false,
    currentComponent: '',
    podcastName: '',
    brandColor: '',
    currentUser: {
        name: '',
        email: '',
    },
    translations: new LocalizedStrings(localizations),
    lang: 'en',
    channelName: 'MyChannelName',
    isLoading: false
}

const site = {
    setIsOpenCon(state, action) {
        state.isOpenConfigurator = action.payload;
    },
    setThumbtack(state, action) {
        state.thumbtack = action.payload
    },
    setCurrentComponent(state, action) {
        state.currentComponent = action.payload;
    },
    setUserEmail(state, action) {
        state.currentUser.email = action.payload;
    },
    setCurrentUser(state, action) {
        // state.currentUser.name = action.payload.name;
        // state.currentUser.email = action.payload.email;
        state.currentUser = action.payload;
    },
    setUserDetails(state, action) {
        state.currentUser.name = action.payload.adminName;
        state.currentUser.email = action.payload.adminEmail;
        state.podcastName = action.payload.podcastName;
        state.channelName = action.payload.channelName;
        state.brandColor = action.payload.brandColor;
    },
    setLang(state, action) {
        state.lang = action.payload;
    },
    setIsLoading(state,action){
        state.isLoading = action.payload
    }
}
export default produce((state, action) => createReducer(state, action, site), initialState)