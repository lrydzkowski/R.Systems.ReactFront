import { useAuth0 } from "@auth0/auth0-react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import useRoles from "@app/hooks/user-roles";
import useUrls, { Pages } from "@app/router/use-urls";
import "./app-menu.css";
import NavigationHotkeys from "./navigation-hotkeys";

export interface AppMenuProps {
  handleMenuLinkClick?: () => void;
}

export default function AppMenu({ handleMenuLinkClick = () => null }: AppMenuProps) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { getPath, getName } = useUrls();
  const { isAdmin } = useRoles();

  const redirectToSetsList = (): void => {
    navigate(getPath(Pages.sets));
  };

  return (
    <List component="nav">
      {!isAuthenticated && (
        <>
          <ListItemButton component={NavLink} to={getPath(Pages.login)} onClick={handleMenuLinkClick}>
            <ListItemText primary={getName(Pages.login)} />
          </ListItemButton>
          <ListItemButton component={NavLink} to={getPath(Pages.about)} onClick={handleMenuLinkClick}>
            <ListItemText primary={getName(Pages.about)} />
          </ListItemButton>
        </>
      )}
      {isAuthenticated && (
        <>
          <ListItemButton component={NavLink} to={getPath(Pages.home)} onClick={handleMenuLinkClick}>
            <ListItemText primary={getName(Pages.home)} />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary={getName(Pages.lexicaLabel)} onClick={redirectToSetsList} />
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                className="app-menu--sub-menu-list-item-button"
                component={NavLink}
                to={getPath(Pages.sets)}
                onClick={handleMenuLinkClick}
                end
              >
                <ListItemText primary={getName(Pages.sets)} />
              </ListItemButton>
              {isAdmin && (
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      className="app-menu--sub-menu-level-2-list-item-button"
                      component={NavLink}
                      to={getPath(Pages.newSet)}
                      onClick={handleMenuLinkClick}
                    >
                      <ListItemText primary={getName(Pages.newSet)} />
                    </ListItemButton>
                  </List>
                </Collapse>
              )}
            </List>
          </Collapse>
          <ListItemButton component={NavLink} to={getPath(Pages.about)} onClick={handleMenuLinkClick}>
            <ListItemText primary={getName(Pages.about)} />
          </ListItemButton>
        </>
      )}
      <NavigationHotkeys></NavigationHotkeys>
    </List>
  );
}
