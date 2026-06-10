'use client';
// import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import Admin from "@/components/admin";
import { useMenu } from '@/context/menu/useMenu';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useMenu();
  // const router = useRouter();
  if (!isAuthenticated) {
    // router.replace('/login');
    return <Admin.Login />;
  }
  return <>{children}</>;
}
