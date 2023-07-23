import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

export default function useRoles() {
  const { user } = useAuth0();
  const isAdmin = useMemo(() => {
    const adminRoleName = "r-systems/roles";
    const adminRole = "admin";
    if (!user) {
      return false;
    }

    return user[adminRoleName].indexOf(adminRole) > -1;
  }, [user]);

  return { isAdmin };
}
