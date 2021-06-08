import produce from "immer";
import createReducer from "./reducerUtils";

const initialState = {
  userName: "",
  userId: null,
  email: null,
  jwtCookie: null,
  displayName: null,
  favorite: []
 };

const user = {
  setUserName(state, action) {
    console.log("in set user name" + action.payload);
    state.userName = action.payload;
  },
  setUser(state, action) {
    state.userId = action.payload.user.uid;
    state.userName = action.payload.user.name;
    state.email = action.payload.user.email;
    state.jwtCookie = action.payload.jwt;
  },
  setDisplayName(state, action) {
    state.displayName = action.payload;
  },
  setJwt(state, action) {
    state.jwtCookie = action.payload;
  },
  setFavorite(state, action) {
     var f = state.favorite.filter(x => x === action.payload)
    if (f.length === 0)
      f = state.favorite.concat(action.payload)
    else
      f = state.favorite.filter(x => x !== action.payload)
    state.favorite = f;
   },
};

export default produce(
  (state, action) => createReducer(state, action, user),
  initialState
);
