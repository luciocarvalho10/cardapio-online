import { useContext } from 'react';

import { FirebaseContext } from '@/context/firebase/index';


export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
