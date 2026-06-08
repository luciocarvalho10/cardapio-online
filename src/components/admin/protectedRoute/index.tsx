import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

import { useMenu } from '@/context/menu/useMenu';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useMenu();
  const router = useRouter();
  if (!isAuthenticated) {
    // return <Navigate to="/admin" replace />;
    router.push('/admin');
    return null;
  }
  return <>{children}</>;
}
