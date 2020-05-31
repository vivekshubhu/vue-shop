import firebase from "firebase";
require("firebase/firestore");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5OEd3i0Xa65cOkDy3YP_c2mV0AAgw4PI",
  authDomain: "vue-ecommerce-846d6.firebaseapp.com",
  databaseURL: "https://vue-ecommerce-846d6.firebaseio.com",
  projectId: "vue-ecommerce-846d6",
  storageBucket: "vue-ecommerce-846d6.appspot.com",
  messagingSenderId: "269484318070",
  appId: "1:269484318070:web:5e926f072f746d8c792e57",
  measurementId: "G-GTDV28Z2FL"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore();
