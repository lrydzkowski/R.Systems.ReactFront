import { AccountInfo, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Dialog, DialogTitle, Divider, IconButton } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import "./user-info.scoped.css";

export default function UserInfo() {
  const { inProgress, accounts } = useMsal();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <IconButton color="primary" onClick={handleOpen}>
              <AccountBoxIcon fontSize="large" />
            </IconButton>
          </div>
          <Dialog onClose={handleClose} open={open}>
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
