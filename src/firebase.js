// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMbKnswg0k64FGJ52bSfZH49i3RE-NUnU",
  authDomain: "kanban-todo-9c5f9.firebaseapp.com",
  projectId: "kanban-todo-9c5f9",
  storageBucket: "kanban-todo-9c5f9.appspot.com",
  messagingSenderId: "26642133204",
  appId: "1:26642133204:web:befe075f4062f8f78a4b41"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);