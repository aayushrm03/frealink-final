import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { collection, doc, getDoc, query, where } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAm8dIyEuT-7ReJILQ5pDtZ5ujPYURlwWo",
    authDomain: "freelance-2ad2b.firebaseapp.com",
    projectId: "freelance-2ad2b",
    storageBucket: "freelance-2ad2b.appspot.com",
    messagingSenderId: "1034880507608",
    appId: "1:1034880507608:web:29f909bdd80f005e2141ad",
    measurementId: "G-WXNVKPLBR8"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  export { auth, provider, db, storage, getDoc, query, collection, doc, where};
