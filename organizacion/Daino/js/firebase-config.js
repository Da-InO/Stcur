import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIgbuiAkrg8ZfecTIGRTqVatIvOxcYI3A",
  authDomain: "aventurasonoramagica.firebaseapp.com",
  projectId: "aventurasonoramagica",
  storageBucket: "aventurasonoramagica.firebasestorage.app",
  messagingSenderId: "544708290123",
  appId: "1:544708290123:web:ad5413929dd5fd12b68fce",
  measurementId: "G-C753SEVD4D"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos para que cursed.js pueda importarla
export const db = getFirestore(app);