import { ReactNode } from "react";

import { FirebaseProvider } from "@/context/firebase";
import { MenuProvider } from "@/context/menu";

export function Provider({ children }: { children: ReactNode }){
  return (
    <FirebaseProvider>
      <MenuProvider>{children}</MenuProvider>
    </FirebaseProvider>
  );
}