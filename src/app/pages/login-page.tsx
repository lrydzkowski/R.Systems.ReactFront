import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { loginRequest } from "@app/auth/auth-configuration";
import "./login-page.css";

export default function LoginPage() {
  const { instance } = useMsal();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const handleLogin = () => {
    instance.loginRedirect({ ...loginRequest, redirectStartPage: from }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <>
      <p className="login-page--p">Please sign in to continue</p>
      <Button variant="outlined" size="large" onClick={handleLogin} autoFocus>
        Sign in
      </Button>
    </>
  );
}
