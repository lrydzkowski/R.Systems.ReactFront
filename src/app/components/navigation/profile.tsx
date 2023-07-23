import { useAuth0 } from "@auth0/auth0-react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import useRoles from "@app/hooks/user-roles";
import "./profile.css";

export default function Profile() {
  const { user } = useAuth0();
  const { isAdmin } = useRoles();
  const [isProfileWindowOpen, setIsProfileWindowOpen] = useState<boolean>(false);

  const handleProfileWindowOpening = () => {
    setIsProfileWindowOpen(true);
  };

  const handleProfileWindowClosing = () => {
    setIsProfileWindowOpen(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleProfileWindowOpening}>
        <AccountBoxIcon fontSize="large" />
      </IconButton>
      <Dialog onClose={handleProfileWindowClosing} open={isProfileWindowOpen}>
        <DialogTitle>Profile</DialogTitle>
        <div className="profile--dialog-content">
          <p>Email: {user?.email}</p>
          <p>Is Admin: {isAdmin ? "Yes" : "No"}</p>
        </div>
      </Dialog>
    </>
  );
}
