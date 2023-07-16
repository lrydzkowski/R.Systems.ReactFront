import { useAuth0 } from "@auth0/auth0-react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fade, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import AppMenu from "./app-menu";
import LogoutButton from "./logout-button";
import "./navigation-mobile.css";

export default function NavigationMobile() {
  const { isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="success" onClick={handleClick}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        slotProps={{
          paper: { sx: { width: "200px" } },
        }}
        className="mobile-menu"
      >
        <AppMenu handleMenuLinkClick={handleClose} />
      </Menu>
      {isAuthenticated && <LogoutButton />}
    </>
  );
}
