import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUNkDJqtUqFlnF3_9qpnXK5-758GYdRG0",
  authDomain: "tunely-fe671.firebaseapp.com",
  databaseURL: "https://tunely-fe671-default-rtdb.firebaseio.com",
  projectId: "tunely-fe671",
  storageBucket: "tunely-fe671.appspot.com",
  messagingSenderId: "742422539589",
  appId: "1:742422539589:web:39795bafc7d8962a2c622c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);
