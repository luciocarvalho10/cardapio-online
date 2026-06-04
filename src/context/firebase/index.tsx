'use client'
import { createContext, type ReactNode } from 'react';

import app, { database } from '@/services/firebase';

export type FirebaseContextType =  {
  app: typeof app,
  database: typeof database,
} | null

// Crie o contexto
export const FirebaseContext = createContext<FirebaseContextType>(null);

// Crie um componente Provedor
export function FirebaseProvider({ children }: { children: ReactNode }) {
  // O valor que será disponibilizado para os consumidores do contexto
  const value = { app, database };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
