import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDI4WlCt_4ZRO8avBcH9pEes3hxua8MDEs",
  authDomain: "kandasami-9e246.firebaseapp.com",
  projectId: "kandasami-9e246",
  storageBucket: "kandasami-9e246.appspot.com",
  messagingSenderId: "911282123404",
  appId: "1:911282123404:web:2f1a0e007180721c6681a9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;