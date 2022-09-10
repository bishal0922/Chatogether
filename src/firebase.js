import firebase from "firebase";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBrhh7WwmhKOhVv9K2zgOXBBuzPZn7sFbM",
    authDomain: "hamichat-fa400.firebaseapp.com",
    projectId: "hamichat-fa400",
    storageBucket: "hamichat-fa400.appspot.com",
    messagingSenderId: "992244712458",
    appId: "1:992244712458:web:38351ffc83591210be8bf3"
  }).auth();
  //chaining auth() to firebase to get the authentication service

