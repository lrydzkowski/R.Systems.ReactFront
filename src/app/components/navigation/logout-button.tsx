import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

export default function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <IconButton sx={{ color: "red" }} onClick={handleLogout} className="logout-button">
      <LogoutIcon fontSize="large" />
    </IconButton>
  );
}
