import createReducer from '../reducerUtils';
import produce from 'immer';

const initialState = {
    editGrid: '',
    showInPage: '',
    columns: '',
    mainColor: '',
    buttonStyle: '',
    showCounterViews: true
};

const configImage = {
    initialChannelSettingsConfiguration(state, action) {
        //todo: 
        state.editGrid = action.payload.editGrid;
        state.showInPage = action.payload.showInPage;
        state.columns = action.payload.columns;
        state.mainColor = action.payload.mainColor;
        state.buttonStyle = action.payload.buttonStyle;
    },
    setEditGrid(state, action) {
        state.editGrid = action.payload;
        if (action.payload == 'list') state.columns = '1';
        if (action.payload == 'grid') state.columns = '3';
    },
    setShowInPage(state, action) {
        state.showInPage = action.payload;
    },
    setColumns(state, action) {
        state.columns = action.payload;
    },
    setMainColor(state, action) {
        state.mainColor = action.payload;
    },
    setButtonStyle(state, action) {
        state.buttonStyle = action.payload;
    },
    setShowCounterViews(state, action) {
        state.showCounterViews = action.payload;
    },
};

export default produce((state, action) => createReducer(state, action, configImage), initialState);