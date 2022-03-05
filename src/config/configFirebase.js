import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfbk58eudmWI2IU4IAGZD2jy1Xu7Gz2KM",
  authDomain: "ecommerce-sweet.firebaseapp.com",
  projectId: "ecommerce-sweet",
  storageBucket: "ecommerce-sweet.appspot.com",
  messagingSenderId: "392690128274",
  appId: "1:392690128274:web:0cda4824714a1ffca11d4b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fs = getFirestore(app);
export const storage = getStorage(app);
export default app;
