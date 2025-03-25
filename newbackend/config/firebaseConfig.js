//firebaseConfig.js file
// Import Firebase Admin SDK
const admin = require("firebase-admin");

// Import the service account credentials JSON file
const serviceAccount = require("./newapp-ddcc9-firebase-adminsdk-tmb54-2d8b45cac7.json");  // Update with the correct path

// Initialize Firebase Admin with service account and database URL
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://newapp-ddcc9-default-rtdb.firebaseio.com", // Replace with your actual Firebase Realtime Database URL
  // databaseURL:"https://burgerapp-472c8-default-rtdb.firebaseio.com",
  storageBucket: "newapp-ddcc9.appspot.com",  // Use the correct Firebase Storage bucket URL
  timeout: 60000 
});

// Export the Firebase Admin SDK instance so it can be used elsewhere in your app
module.exports = admin;


// //firebaseConfig.js file
// // Import Firebase Admin SDK
// const admin = require("firebase-admin");

// // Import the service account credentials JSON file
// const serviceAccount = require("./testdb-4d1a5-firebase-adminsdk-u3jvg-16510cb9c4.json");  // Update with the correct path

// // Initialize Firebase Admin with service account and database URL
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://testdb-4d1a5-default-rtdb.firebaseio.com", // Replace with your actual Firebase Realtime Database URL
//   storageBucket: "newapp-ddcc9.appspot.com",  // Use the correct Firebase Storage bucket URL
//   timeout: 60000 
// });

// // Export the Firebase Admin SDK instance so it can be used elsewhere in your app
// module.exports = admin;
