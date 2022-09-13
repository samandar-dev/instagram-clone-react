import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA4K3jk894wR83JePvYHMIe81WdM9W1rkI",
  authDomain: "instagram-clone-react-87408.firebaseapp.com",
  projectId: "instagram-clone-react-87408",
  storageBucket: "instagram-clone-react-87408.appspot.com",
  messagingSenderId: "123953058450",
  appId: "1:123953058450:web:4a5e3e3fda67c5ca870c4b",
  measurementId: "G-23Y1EZRFPG"
})


const db = firebaseApp.firestore();
const auth = firebase.auth()
const storage = firebase.storage();

export { db, auth, storage, firebase } 
