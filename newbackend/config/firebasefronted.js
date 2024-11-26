// const { initializeApp } = require("firebase/app");
// const { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail } = require("firebase/auth");

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAd2KINBnTWebaRlkBGyhGTOTamRHhb7Tg",
//   authDomain: "newapp-ddcc9.firebaseapp.com",
//   databaseURL: "https://newapp-ddcc9-default-rtdb.firebaseio.com",
//   projectId: "newapp-ddcc9",
//   storageBucket: "newapp-ddcc9.appspot.com",
//   messagingSenderId: "842507457397",
//   appId: "1:842507457397:web:71d30dcca1f26f5789393c",
//   measurementId: "G-Q989T6JPRV"
// };

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const auth1 = getAuth(firebase);

// module.exports = {firebase, auth1, createUserWithEmailAndPassword ,sendPasswordResetEmail,signInWithEmailAndPassword};
// firebasefronted.js (client-side Firebase setup)
const { initializeApp } =require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAd2KINBnTWebaRlkBGyhGTOTamRHhb7Tg",
  authDomain: "newapp-ddcc9.firebaseapp.com",
  databaseURL: "https://newapp-ddcc9-default-rtdb.firebaseio.com",
  projectId: "newapp-ddcc9",
  storageBucket: "newapp-ddcc9.appspot.com",
  messagingSenderId: "842507457397",
  appId: "1:842507457397:web:71d30dcca1f26f5789393c",
  measurementId: "G-Q989T6JPRV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore

module.exports =  { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, db };
