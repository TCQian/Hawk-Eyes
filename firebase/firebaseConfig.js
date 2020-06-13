import * as firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoqkSH0HbaSuu2LVgY7Zw9QrjoXsPqVYE",
  authDomain: "hawk-eyes-2021.firebaseapp.com",
  databaseURL: "https://hawk-eyes-2021.firebaseio.com",
  projectId: "hawk-eyes-2021",
  storageBucket: "hawk-eyes-2021.appspot.com",
  messagingSenderId: "198372819473",
  appId: "1:198372819473:web:27eb24d382b28cf403a7b0",
  measurementId: "G-W91DEGM36B"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Initialize Firebase
export default db;