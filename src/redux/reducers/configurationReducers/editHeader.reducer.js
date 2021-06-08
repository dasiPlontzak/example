import createReducer from '../reducerUtils';
import produce from 'immer';

const initialState = {
    alignment: '',
    image: {
        channel: '',
        logo: ''
    },
    text: {
        title: '',
        body: ''
    },
    textColor: {
        title: '',
        body: ''
    },
    fontSize: {
        title: '',
        body: ''
    }

};

const editHeader = {
    initialEditHeaderConfiguration(state, action) {
        // state = { ...action.payload };
        // state = action.payload;
        //todo: 
        state.alignment = action.payload.alignment;
        state.image = action.payload.image;
        state.text = action.payload.text;
        state.textColor = action.payload.textColor;
        state.fontSize = action.payload.fontSize;
    },
    setAlignment(state, action) {
        state.alignment = action.payload;
    },
    setImage(state, action) {
        if (action.payload.file) {
            var imgUrl = URL.createObjectURL(action.payload.file);
            state.image[action.payload.key] = imgUrl;
        }
        else {
            state.image[action.payload.key] = action.payload.imgUrl;
        }
    },

    setTitleText(state, action) {
        state.text.title = action.payload;
    },
    setTitleTextColor(state, action) {
        state.textColor.title = action.payload;
    },
    setBodyText(state, action) {
        state.text.body = action.payload;
    },
    setBodyTextColor(state, action) {
        state.textColor.body = action.payload;
    },
};

export default produce((state, action) => createReducer(state, action, editHeader), initialState);