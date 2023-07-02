import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";
import "./app-menu.css";
import NavigationHotkeys from "./navigation-hotkeys";

export interface AppMenuProps {
  handleMenuLinkClick?: () => void;
}

export default function AppMenu({ handleMenuLinkClick = () => null }: AppMenuProps) {
  const navigate = useNavigate();

  const redirectToSetsList = (): void => {
    navigate(Urls.getPath(Pages.sets));
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
          <ListItemText primary={Urls.getName(Pages.lexicaLabel)} onClick={redirectToSetsList} />
        </ListItemButton>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className="app-menu--sub-menu-list-item-button"
              component={NavLink}
              to={Urls.getPath(Pages.sets)}
              onClick={handleMenuLinkClick}
              end
            >
              <ListItemText primary={Urls.getName(Pages.sets)} />
            </ListItemButton>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className="app-menu--sub-menu-level-2-list-item-button"
                  component={NavLink}
                  to={Urls.getPath(Pages.newSet)}
                  onClick={handleMenuLinkClick}
                >
                  <ListItemText primary={Urls.getName(Pages.newSet)} />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>
        <ListItemButton component={NavLink} to={Urls.getPath(Pages.about)} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.getName(Pages.about)} />
        </ListItemButton>
      </AuthenticatedTemplate>
      <NavigationHotkeys></NavigationHotkeys>
    </List>
  );
}
