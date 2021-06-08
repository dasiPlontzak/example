// import { actions } from "./actions";
// import axios from "axios";
// import { auth } from "../firebase";
// import { getJwtFromCookie } from "../cookie";
// import history from "../config";
// // import { useHistory } from "react-router-dom";

// // import history from '../../config/history'

// const urlLogin = `${keys.API_URL}`; // `${keys.API_URL}signup`

// export const onAuthStateChanged = ({ dispatch, getState }) => (next) => (
//   action
// ) => {
//   //console.log("onAuthStateChanged in loginMiddleware");

//   if (action.type === "ON_AUTH_STATE_CHANGE") {
//     auth.onAuthStateChanged((user) => {

//       if (user) {
//         // auth.signOut()
//         console.log("user onauth");
//         dispatch(actions.getUserNameByEmail(user.email));
//       } else console.log("not user on auth");
//     });
//   }
//   return next(action);
// };

// export const getUserNameByEmail = ({ dispatch, getState }) => (next) => (
//   action
// ) => {
//   if (action.type === "GET_USER_NAME_BY_EMAIL") {
//     console.log("in getUserNameByEmail");
//     axios
//       .get(`${urlLogin}/register/getUserNameByEmail?email=${action.payload}`)
//       .then((res) => {
//         let userName = history.location.search.split("/")[2];
//         console.log(userName);
//         console.log(history.location);

//         if (
//           userName !== undefined &&
//           res.data !== null &&
//           res.data.username !== userName
//         ) {
//           auth.signOut();
//           history.push("/login");
//         } else {
//           auth.currentUser
//             .getIdToken(true)
//             .then((firebaseToken) => {
//               console.log(firebaseToken);
//               dispatch(actions.getAccessToken(firebaseToken));
//             })
//             .catch((error) => console.log(error));
//         }
//       })

//       .catch((err) => console.log(err));
//   }
//   return next(action);
// };

// export const getAccessToken = ({ dispatch, getState }) => (next) => (
//   action
// ) => {
//   if (action.type === "GET_ACCESS_TOKEN") {
//     const config = {
//       headers: {
//         dataType: "json",
//         contentType: "application/json",
//       },
//     };

//     const data = {
//       action: "firebaseloginwithcredentials",
//       jwt: action.payload,
//     };

//     // dispatch(actions.setLoading());
//     console.log("in get access token");
//     axios
//       .post(`${urlLogin}/register/getAccessToken`, data, config)
//       .then((res) => {
//         console.log("res");
//         dispatch(actions.checkPermission(res.data));
//       })
//       .catch((err) => console.log(err));
//   }
//   return next(action);
// };

// export const checkPermission = ({ dispatch, getState }) => (next) => (
//   action
// ) => {
//   if (action.type === "CHECK_PERMISSION") {
//     let TokenToString = action.payload.accessToken.toString();
//     let userName = getState().user.userName;
//     let email = getState().user.email;
//     const data = {
//       action: "loginCheckPermission",
//       token: TokenToString,
//       userName: userName
//     };

//     const config = {
//       headers: {
//         Authorization: TokenToString,
//       },
//       dataType: "json",
//       contentType: "application/json",
//       withCradentials: true,
//     };

//     axios
//       .post(`${urlLogin}/register/checkPermission`, data, config)
//       .then((res) => {
//         console.log("res from checkpermission");
//         data.jwt = res.data.jwt;
//         data.uid = res.data.uid;
//         data.email = email;
//         dispatch(actions.setJwt(data));
//       })
//       .catch((err) => console.log(err));
//   }
//   return next(action);
// };

// export const setJwt = ({ dispatch, getState }) => (next) => (action) => {
//   if (action.type === "SET_JWT") {
//     console.log("in success checkPermission");

//     let jsonWebToken = action.payload.jwt;
//     let userName = action.payload.userName;
//     let email = action.payload.email;

//     // console.log(usename, action.payload.is_username);

//     let noQuotesJwtData = jsonWebToken.split('"').join("");
//     let now = new Date();
//     now.setMonth(now.getMonth() + 1);
//     document.cookie =
//       "jwt=" +
//       noQuotesJwtData +
//       ",domain=.soundbox.me" +
//       ", path=/, Expires=" +
//       now.toUTCString() +
//       ",";

//    // dispatch(actions.setLoading());

//     let route = `/`;
//     // let search = history.location.search;

//     // if (search.includes("routes")) {
//     //   route = search.split("=")[1];
//     // }

//     dispatch(actions.setCurrentUser({name:userName, email:email}));

//     // window.location.replace(route);
//     history.push(route);
//   }
//   return next(action);
// };

// export const checkUserName = ({ dispatch, getState }) => (next) => (action) => {
//   if (action.type === "CHECK_USER_NAME") {
//     const jwt = getJwtFromCookie("jwt");
//     const data = {
//       token: jwt,
//       usernameToCheck: action.payload,
//     };
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: jwt,
//       },
//     };

//     axios
//       .post(`${urlLogin}/checkUsername`, data, config)
//       .then((res) => {
//         if (!res.data.availability) {
//           dispatch(
//             actions.setMessage(
//               "The user name is already taken. Please choose another username."
//             )
//           );
//         } else {
//           let route = `/admin/${action.payload}`;
//           let search = history.location.search;

//           if (search.includes("routes")) {
//             route = search.split("=")[1];
//           }
//           // history.push(route);
//           window.location.replace(route);
//         }
//       })
//       .catch((err) => console.log(err));
//   }
//   return next(action);
// };
