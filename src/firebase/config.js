import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyC4Zvc3XH5l-C8P4c7uMT4cPEgRuO1YGFk",
  authDomain: "unique-retro-utn.firebaseapp.com",
  projectId: "unique-retro-utn",
  storageBucket: "unique-retro-utn.firebasestorage.app",
  messagingSenderId: "748475417748",
  appId: "1:748475417748:web:79690024139921d251e081"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 
export const auth = getAuth(app);   
