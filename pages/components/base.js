import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore"; 
import { getDatabase, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7Ixpyy8Zt21LVNofn98zW7ATE9aK9fdo",
  authDomain: "yuup-e11e3.firebaseapp.com",
  databaseURL: "https://yuup-e11e3-default-rtdb.firebaseio.com",
  projectId: "yuup-e11e3",
  storageBucket: "yuup-e11e3.appspot.com",
  messagingSenderId: "654336058942",
  appId: "1:654336058942:web:56b88dc95f9b8f37c3136f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);   
export const database = getDatabase(app); 
