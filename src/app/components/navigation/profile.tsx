import { AccountInfo, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import "./profile.css";

export default function Profile() {
  const { inProgress, accounts } = useMsal();
  const [isProfileWindowOpen, setIsProfileWindowOpen] = useState<boolean>(false);

  const handleProfileWindowOpening = () => {
    setIsProfileWindowOpen(true);
  };

  const handleProfileWindowClosing = () => {
    setIsProfileWindowOpen(false);
  };

  let account: AccountInfo | null = null;
  if (inProgress === InteractionStatus.None && accounts.length > 0) {
    account = accounts[0];
  }

  return (
    <>
      <IconButton color="primary" onClick={handleProfileWindowOpening}>
        <AccountBoxIcon fontSize="large" />
      </IconButton>
      <Dialog onClose={handleProfileWindowClosing} open={isProfileWindowOpen}>
        <DialogTitle>Profile</DialogTitle>
        <div className="profile--dialog-content">
          <p>{account?.username}</p>
        </div>
      </Dialog>
    </>
  );
}
