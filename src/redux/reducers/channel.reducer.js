import produce from 'immer';
import createReducer from './reducerUtils'

const initialState = {
  channelsList: [],
  currentChannel:{}
};

const channel = {
  initialChannel(state, action) {
    state.currentChannel = action.payload;
  },
  addChannel(state, action) {
    state.channelsList = state.channelsList.concat(action.payload.channel);
  },
  updateChannel(state, action) {
    var q = state.channelsList.filter(
      (channel) => channel._id !== action.payload.currentChannel._id
    );
    q = q.concat(action.payload.currentChannel);
    state.channelsList = q;
  },
  deleteChannel(state, action) {
    state.channelsList = state.channelsList.filter(
      (channel) => channel._id !== action.payload
    )
    }
}
export default produce((state, action)=> createReducer(state, action, channel ), initialState)