import { useMsal } from "@azure/msal-react";
import { ListItemButton, ListItemText } from "@mui/material";

export default function SignOutListItemButton() {
  const { instance } = useMsal();

  function signOut() {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/login",
    });
  }

  return (
    <ListItemButton onClick={signOut}>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  );
}
