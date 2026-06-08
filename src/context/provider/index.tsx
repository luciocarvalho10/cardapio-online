import { ReactNode } from 'react';

import { FirebaseProvider } from '@/context/firebase';
import { MenuProvider } from '@/context/menu';

import DragAndDropProvider from './dragAndDrop';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <FirebaseProvider>
      <MenuProvider>
        <DragAndDropProvider>
          {children}
        </DragAndDropProvider>
      </MenuProvider>
    </FirebaseProvider>
  );
}
