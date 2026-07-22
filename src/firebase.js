import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3Z1pfa2I8hLWwPdmpBnjdGNCndEruqT8",
    authDomain: "politask-e7f7d.firebaseapp.com",
    projectId: "politask-e7f7d",
    storageBucket: "politask-e7f7d.firebasestorage.app",
    messagingSenderId: "267481654630",
    appId: "1:267481654630:web:b344207cdbe8bb23b6d4a7",
};

const appFirebase = initializeApp(firebaseConfig);

export const authFirebase = getAuth(appFirebase);
export const dbFirebase = getFirestore(appFirebase);

// PROVEEDOR DE GOOGLE
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export default appFirebase;