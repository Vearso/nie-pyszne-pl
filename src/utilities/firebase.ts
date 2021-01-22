import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyAJYwKkMzsvlZy7Rg9qyQFI3So1VahALAk",
  authDomain: "nie-pyszne-pl-13352.firebaseapp.com",
  databaseURL:
    "https://nie-pyszne-pl-13352-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nie-pyszne-pl-13352",
  storageBucket: "nie-pyszne-pl-13352.appspot.com",
  messagingSenderId: "873197773908",
  appId: "1:873197773908:web:b29f8106aab993cbe379c1"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.database();
export const auth = fb.auth();
