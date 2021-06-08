// import { auth } from '../../config/firebase'
// import firebase from "firebase/app"

// const loginService={

//     signUp:(email, password)=> {
//         return auth.createUserWithEmailAndPassword(email, password)
//     },

//     signIn:(email, password)=> {
//         return auth.signInWithEmailAndPassword(email, password)
//     },

//     resetPassword:(email)=> {
//         return auth.sendPasswordResetEmail(email)

//     },

//     signInWithGoogle:()=> {
//         console.log('googleProvider');
//         const googleProvider = new firebase.auth.GoogleAuthProvider()
//         console.log(googleProvider);
//         return auth.signInWithPopup(googleProvider)
//     },

//     signInWithFacebook:()=> {
//         console.log('facebookProvider');
//         var facebookProvider = new firebase.auth.FacebookAuthProvider();
//         console.log(facebookProvider);
//         return auth.signInWithPopup(facebookProvider)
//     }
// }

// export default loginService;