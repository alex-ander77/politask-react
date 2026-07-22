import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend,
} from "firebase/ai";

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
// Firebase AI Logic con Gemini Developer API
const aiFirebase = getAI(appFirebase, {
    backend: new GoogleAIBackend(),
});

// Modelo que usará PoliBot
export const modelPoliBot = getGenerativeModel(aiFirebase, {
    model: "gemini-3.5-flash",

    systemInstruction: `
    Eres PoliBot, el asistente virtual de PoliTask.

    PoliTask es una plataforma universitaria donde los estudiantes
    publican y aceptan tareas, obtienen puntos, mejoran su reputación
    y canjean recompensas.

    Responde siempre en español.
    Sé amable, claro y breve.
    Prioriza las preguntas relacionadas con PoliTask, tareas,
    puntos, recompensas, perfiles y el uso de la plataforma.

    Cuando no conozcas una función concreta del sistema,
    dilo con honestidad y ofrece orientación general.
    `,
});

export default appFirebase;