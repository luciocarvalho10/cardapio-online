import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useMenu } from "../../../context/MenuContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // const { isAuthenticated } = useMenu();
  // if (!isAuthenticated) {
  //   return <Navigate to="/admin" replace />;
  // }
  return <>{children}</>;
}
