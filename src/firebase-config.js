
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB6Mxp1ytVHyIYOIdCFo2fYf7h6QieB9_c",
  authDomain: "chatglobaldev.firebaseapp.com",
  projectId: "chatglobaldev",
  storageBucket: "chatglobaldev.appspot.com",
  messagingSenderId: "857083942722",
  appId: "1:857083942722:web:20689695bf1b74797edadb",
  measurementId: "G-NYCQC30P3Y"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)