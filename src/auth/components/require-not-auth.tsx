import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

export default function RequireNotAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
