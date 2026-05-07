import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2rRrE-QcAAQB9OX1KjOh24zB-0g9jZXs",
  authDomain: "task-2ea3e.firebaseapp.com",
  projectId: "task-2ea3e",
  storageBucket: "task-2ea3e.firebasestorage.app",
  messagingSenderId: "850427258551",
  appId: "1:850427258551:web:4daae7332999a96dacf32",
  measurementId: "G-4KX6Z5C0Z7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);