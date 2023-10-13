import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv"
dotenv.config() 
const firebaseConfig = {
    apiKey: `${process.env.API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
    databaseURL: `${process.env.NEXT_PUBLIC_DATABASE_URL}`,
    projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_ADD_ID}`,
    measurementId: `${process.env.NEXT_PUBLIC_MEASURMENT_ID}`
  };
  const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;