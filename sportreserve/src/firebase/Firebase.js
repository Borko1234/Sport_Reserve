import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHBQs3Q12FYjRqRz2kUDohVJAW0-Mi6jo",
  authDomain: "sportreserve-771f9.firebaseapp.com",
  projectId: "sportreserve-771f9",
  storageBucket: "sportreserve-771f9.firebasestorage.app",
  messagingSenderId: "765086510759",
  appId: "1:765086510759:web:b6c2bbd259c3710d3fb582",
  measurementId: "G-5JWD6XYLFQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;