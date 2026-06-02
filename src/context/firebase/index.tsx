'use client'
import { createContext, type ReactNode } from 'react';

import { ProductRepository } from '@/repository/ProductRepository';
import app, { database } from '@/services/firebase';

export type FirebaseContextType =  {
  app: typeof app,
  database: typeof database,
  productRepository: ProductRepository
} | null

// Crie o contexto
export const FirebaseContext = createContext<FirebaseContextType>(null);

// Crie e exporte suas instâncias de repositório
export const productRepository = new ProductRepository(database, 'products');

// Crie um componente Provedor
export function FirebaseProvider({ children }: { children: ReactNode }) {
  // O valor que será disponibilizado para os consumidores do contexto
  const value = { app, database, productRepository };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
