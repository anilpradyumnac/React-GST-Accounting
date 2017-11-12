import firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyCXfCJZijR68NfCYUmcabcVixW2JosKEg8",
    authDomain: "pureaccounting-fe8b0.firebaseapp.com",
    databaseURL: "https://pureaccounting-fe8b0.firebaseio.com",
    projectId: "pureaccounting-fe8b0",
    storageBucket: "pureaccounting-fe8b0.appspot.com",
    messagingSenderId: "477386127168",
    persistence:true
  };
  firebase.initializeApp(config)
  export default firebase;