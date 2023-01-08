import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { loginRequest } from "app/auth-configuration";
import { Urls } from "app/routing/urls";
import { useLocation } from "react-router-dom";
import "./login-page.scoped.css";

export default function LoginPage() {
  const { instance } = useMsal();
  const location = useLocation();

  const from = location.state?.from?.pathname || Urls.pages.home.path;

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
