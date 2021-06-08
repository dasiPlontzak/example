import produce from 'immer';
import createReducer from './reducerUtils';

const initialState = {
  audioList: [],
  currentAudio: {},
  smallScreen: true,
  playNowAudioId:undefined,
  audioHtml:{}
};

const audio = {
  initialAudios(state, action) {
    if (action.payload.constructor === Array)
      state.audioList = action.payload;
    else state.audioList = state.audioList.concat(action.payload);
  },
  setAudioHtml(state, action){
   state.audioHtml=action.payload;
  },
  setAudioid(state, action) {
    state.selectAudioId = action.payload;
  },
  setPlayNowAudioId(state, action) {
    state.playNowAudioId = action.payload;
  },
  saveAudio(state, action) {
    if (action.payload.audio)
      state.audioList = state.audioList.concat(action.payload.audio);
  },
  updateAudio(state, action) {
    var q = state.audioList.filter(
      (audio) => audio._id !== action.payload._id
    );
    q = q.concat(action.payload);
    state.audioList = q;
  },
  deleteAudio(state, action) {
    state.audioList = state.audioList.filter(
      (audio) => audio._id !== action.payload
    )
  },
  addCounterViews(state, action) {
    var q = state.audioList.filter(
      (audio) => audio._id !== action.payload._id
    );
    q = q.concat(action.payload);
    state.audioList = q;

  },
  setCurrentAudio(state, action) {
    state.currentAudio = action.payload;
  },
  changeCurrentAudioImage(state, action) {
    if (action.payload.file) {
      var imgUrl = URL.createObjectURL(action.payload.file);
      state.currentAudio.img = imgUrl;
    }
    else {
      state.currentAudio.img = action.payload.imgUrl;
    }
  },
  setCurrentAudioByFieldName(state, action) {
    state.currentAudio[action.payload.key] = action.payload.value;
  },
  setSmallScreen(state, action) {
    state.smallScreen = action.payload;
  }
}

export default produce((state, action) => createReducer(state, action, audio), initialState)
