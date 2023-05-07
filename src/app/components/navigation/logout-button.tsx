import { useMsal } from "@azure/msal-react";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { Pages, Urls } from "@app/router/urls";

export default function LogoutButton() {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: Urls.getPath(Pages.login),
    });
  };

  return (
    <IconButton sx={{ color: "red" }} onClick={handleLogout} className="logout-button">
      <LogoutIcon fontSize="large" />
    </IconButton>
  );
}
