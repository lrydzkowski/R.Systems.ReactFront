import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";

interface INotRequireAuthProps {
  children: JSX.Element;
}

export default function NotRequireAuth(props: INotRequireAuthProps) {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={Urls.getPath(Pages.home)} replace />;
  }

  return props.children;
}
