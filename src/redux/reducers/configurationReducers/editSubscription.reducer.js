import createReducer from '../reducerUtils';
import produce from 'immer';

const initialState = {
    name: true,
    email: true,
    phone: false,
    adress: false,
};

const editSubscriptionConfigurator = {
    initialEditSubscribtionConfiguration(state, action) {
        //todo: 
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.adress = action.payload.adress;
    },
    settingFields(state, action) {
        state[action.payload.filedName] = action.payload.value;
    }
}
export default produce((state, action) => createReducer(state, action, editSubscriptionConfigurator), initialState)