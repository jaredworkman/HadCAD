var firebase = require("firebase/app");
require("firebase/auth");
require('firebase/storage');


var config = {
    apiKey: "AIzaSyAGWHn0eClGUDeWhJh4eLuFT2ZWNqn9orQ",
    authDomain: "hadcad-a07fd.firebaseapp.com",
    databaseURL: "https://hadcad-a07fd.firebaseio.com",
    projectId: "hadcad-a07fd",
    storageBucket: "hadcad-a07fd.appspot.com",
    messagingSenderId: "18767597312"
  };
firebase.initializeApp(config);

var storage = firebase.storage();
const auth = firebase.auth();

export {storage, auth};