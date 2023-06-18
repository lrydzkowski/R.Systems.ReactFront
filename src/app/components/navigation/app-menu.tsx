import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";
import "./app-menu.css";

export interface AppMenuProps {
  handleMenuLinkClick?: () => void;
}

export default function AppMenu({ handleMenuLinkClick = () => null }: AppMenuProps) {
  const location = useLocation();
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    lexica: true,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>, key: string) => {
    event.preventDefault();
    event.stopPropagation();
    const newOpenState = { ...openState };
    newOpenState[key] = !newOpenState[key];
    setOpenState(newOpenState);
  };

  const getNoLinkClass = (key: string): string => {
    if (location.pathname.startsWith(`/${key}`) && !openState[key]) {
      return "app-menu--active";
    }
    return "";
  };

  return (
    <List component="nav">
      <UnauthenticatedTemplate>
        <ListItemButton component={NavLink} to={Urls.getPath(Pages.login)} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.getName(Pages.login)} />
        </ListItemButton>
        <ListItemButton component={NavLink} to={Urls.getPath(Pages.about)} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.getName(Pages.about)} />
        </ListItemButton>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ListItemButton component={NavLink} to={Urls.getPath(Pages.home)} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.getName(Pages.home)} />
        </ListItemButton>
        <ListItemButton className={getNoLinkClass("lexica")}>
          <ListItemText primary={Urls.getName(Pages.lexicaLabel)} />
        </ListItemButton>
        <Collapse in={openState.lexica} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className="app-menu--sub-menu-list-item-button"
              component={NavLink}
              to={Urls.getPath(Pages.newSet)}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.getName(Pages.newSet)} />
            </ListItemButton>
            <ListItemButton
              className="app-menu--sub-menu-list-item-button"
              component={NavLink}
              to={Urls.getPath(Pages.sets)}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.getName(Pages.sets)} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton component={NavLink} to={Urls.getPath(Pages.about)} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.getName(Pages.about)} />
        </ListItemButton>
      </AuthenticatedTemplate>
    </List>
  );
}
