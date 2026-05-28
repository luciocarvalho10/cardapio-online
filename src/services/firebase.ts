import { getApp,getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Importe getDatabase para o Realtime Database

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function createFirebaseApp() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
}

// Inicialize o app Firebase (ou obtenha a instância existente)
const app = createFirebaseApp();

// Inicialize o Realtime Database e obtenha uma referência ao serviço
export const database = getDatabase(app);

// Você pode exportar 'app' também se precisar dele em outros lugares
export default app;
