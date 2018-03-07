import Rebase from 're-base';
import firebase from 'firebase';

const DB_CONFIG = {
    apiKey: "AIzaSyDJOBoHCbg7r8xmCtGeR77idOaj0t4lav8",
    authDomain: "kart-d548f.firebaseapp.com",
    databaseURL: "https://kart-d548f.firebaseio.com",
    projectId: "kart-d548f",
    storageBucket: "kart-d548f.appspot.com",
    messagingSenderId: "856437495198"
  };

const app = firebase.initializeApp(DB_CONFIG);
const base = Rebase.createClass(app.database());

export { app, base }
