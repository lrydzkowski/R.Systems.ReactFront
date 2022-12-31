import { useIsAuthenticated } from "@azure/msal-react";
import { urls } from "app/routing/urls";
import { Navigate, useLocation } from "react-router-dom";

interface IRequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth(props: IRequireAuthProps) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={urls.pages.login} state={{ from: location }} replace />;
  }

  return props.children;
}
