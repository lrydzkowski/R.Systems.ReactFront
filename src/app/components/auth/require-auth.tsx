import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";
import useUrls, { Pages } from "@app/router/use-urls";

interface IRequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth(props: IRequireAuthProps) {
  const { isAuthenticated } = useAuth0();
  const { getPath } = useUrls();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={getPath(Pages.login)} state={{ from: location }} replace />;
  }

  return props.children;
}
