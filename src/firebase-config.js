import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0cc4xeWUM92CGvODJoozEKdbyiH_8TM0",
  authDomain: "gyel-shay.firebaseapp.com",
  projectId: "gyel-shay",
  storageBucket: "gyel-shay.appspot.com",
  messagingSenderId: "782327170611",
  appId: "1:782327170611:web:1c36ba310629ac77c10546",
  measurementId: "G-7ZRDSV2GPH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
