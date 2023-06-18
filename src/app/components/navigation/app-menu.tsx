import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";
import "./app-menu.css";

export interface AppMenuProps {
  handleMenuLinkClick?: () => void;
}

export default function AppMenu({ handleMenuLinkClick = () => null }: AppMenuProps) {
  const location = useLocation();

  const getNoLinkClass = (key: string): string => {
    if (location.pathname.startsWith(`/${key}`)) {
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
        <ListItemButton>
          <ListItemText primary={Urls.getName(Pages.lexicaLabel)} />
        </ListItemButton>
        <Collapse in={true} timeout="auto" unmountOnExit>
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
