import { Navigate, useLocation } from "react-router-dom";
import useRoles from "@app/hooks/user-roles";
import useUrls, { Pages } from "@app/router/use-urls";

interface IRequireRoleProps {
  children: JSX.Element;
}

export default function RequireAdmin(props: IRequireRoleProps) {
  const { isAdmin } = useRoles();
  const { getPath } = useUrls();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to={getPath(Pages.home)} state={{ from: location }} replace />;
  }

  return props.children;
}
