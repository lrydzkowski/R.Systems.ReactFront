import { Fade, IconButton, Menu } from "@mui/material";
import AppMenu from "app/components/app-menu";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavigationMobile() {
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
      <IconButton size="small" onClick={handleClick} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{ sx: { width: "200px" } }}
      >
        <AppMenu handleMenuLinkClick={handleClose} />
      </Menu>
    </>
  );
}
