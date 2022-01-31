import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgO58YHs7zPR29GyCBm8gHuKNzR4dVqLY",
    authDomain: "copos-5dedc.firebaseapp.com",
    projectId: "copos-5dedc",
    storageBucket: "copos-5dedc.appspot.com",
    messagingSenderId: "189486621779",
    appId: "1:189486621779:web:85a7697a076160e18c12a6"
  };

  firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const coposCollection = db.collection("copos")

export {
    db, auth, profileCollection, coposCollection
}