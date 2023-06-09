import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate, useLocation } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";

interface IRequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth(props: IRequireAuthProps) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={Urls.getPath(Pages.login)} state={{ from: location }} replace />;
  }

  return props.children;
}
