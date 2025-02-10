import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBapX3TjRuEbdqpYRQTszJ0Dc5F3xfYJDY",
    authDomain: "neocart-5b1db.firebaseapp.com",
    projectId: "neocart-5b1db",
    storageBucket: "neocart-5b1db.firebasestorage.app",
    messagingSenderId: "22834143476",
    appId: "1:22834143476:web:86d3101cdc326b9823bea1",
    measurementId: "G-DH2JCM73LZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };