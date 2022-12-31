import { useIsAuthenticated } from "@azure/msal-react";
import { urls } from "app/routing/urls";
import { Navigate } from "react-router-dom";

interface INotRequireAuthProps {
  children: JSX.Element;
}

export default function NotRequireAuth(props: INotRequireAuthProps) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={urls.pages.home} replace />;
  }

  return props.children;
}
