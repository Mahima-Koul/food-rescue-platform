import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBmOtWGRjHzMQgVV0hc4eHxQXeuzJjTZ_U",
  authDomain: "food-rescue-platform-eca68.firebaseapp.com",
  projectId: "food-rescue-platform-eca68",
  storageBucket: "food-rescue-platform-eca68.firebasestorage.app",
  messagingSenderId: "638650625473",
  appId: "1:638650625473:web:3d3cee5692fa47de061340"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);