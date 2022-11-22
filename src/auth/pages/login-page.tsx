import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { loginRequest } from "auth/auth-configuration";
import { useLocation } from "react-router-dom";
import "./login-page.scoped.css";

export default function LoginPage() {
  const { instance } = useMsal();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const handleLogin = () => {
    instance.loginRedirect({ ...loginRequest, redirectStartPage: from }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <>
      <p>Please sign in to continue</p>
      <Button variant="outlined" size="large" onClick={handleLogin}>
        Sign in
      </Button>
    </>
  );
}
