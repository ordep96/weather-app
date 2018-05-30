import firebase from 'firebase'

const  config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messaging"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;

export const WeatherApiKey = "Api key wheather app";

