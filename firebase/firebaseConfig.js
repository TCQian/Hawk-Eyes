import * as firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD6XjUc0P8cSUMBecm1Ex9V3d8XO9LXiTo",
  authDomain: "hawk-eyes-86980.firebaseapp.com",
  databaseURL: "https://hawk-eyes-86980.firebaseio.com",
  projectId: "hawk-eyes-86980",
  storageBucket: "hawk-eyes-86980.appspot.com",
  messagingSenderId: "154482292262",
  appId: "1:154482292262:web:4057b2bced0bef3de558e7",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// Initialize Firebase
export default firebase;
