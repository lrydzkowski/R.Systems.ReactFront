import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import useUrls, { Pages } from "@app/router/use-urls";

interface INotRequireAuthProps {
  children: JSX.Element;
}

export default function NotRequireAuth(props: INotRequireAuthProps) {
  const { isAuthenticated } = useAuth0();
  const { getPath } = useUrls();

  if (isAuthenticated) {
    return <Navigate to={getPath(Pages.home)} replace />;
  }

  return props.children;
}
