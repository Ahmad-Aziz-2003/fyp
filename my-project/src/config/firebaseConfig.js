// // src/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

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
// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// export { auth };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import database

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp); // Initialize database

export { auth, database };
