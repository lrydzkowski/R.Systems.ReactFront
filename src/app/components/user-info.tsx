import { AccountInfo, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Dialog, DialogTitle, Divider, IconButton } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import "./user-info.scoped.css";
import { Urls } from "app/routing/urls";

export default function UserInfo() {
  const { inProgress, accounts, instance } = useMsal();
  const [isProfileWindowOpen, setIsProfileWindowOpen] = useState<boolean>(false);

  const handleProfileWindowOpening = () => {
    setIsProfileWindowOpen(true);
  };

  const handleProfileWindowClosing = () => {
    setIsProfileWindowOpen(false);
  };

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: Urls.pages.login.path,
    });
  };

  let account: AccountInfo | null = null;
  if (inProgress === InteractionStatus.None && accounts.length > 0) {
    account = accounts[0];
  }

  return (
    <>
      {account !== null && (
        <>
          <Divider variant="middle" />
          <div>
            <IconButton color="primary" onClick={handleProfileWindowOpening}>
              <AccountBoxIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary" onClick={handleLogout} className="logout-button">
              <LogoutIcon fontSize="large" />
            </IconButton>
          </div>
          <Dialog onClose={handleProfileWindowClosing} open={isProfileWindowOpen}>
            <DialogTitle>Profile</DialogTitle>
            <div className="dialog-content">
              <p>{account.username}</p>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
