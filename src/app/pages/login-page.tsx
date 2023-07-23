import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { getAuthorizationParams } from "@app/auth/auth0-configuration";
import "./login-page.css";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();
  const authorizationParams = getAuthorizationParams();

  const handleLogin = () => {
    loginWithRedirect({ authorizationParams });
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
