import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Urls } from "app/routing/urls";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./app-menu.scoped.css";

export interface AppMenuProps {
  handleMenuLinkClick?: () => void;
}

export default function AppMenu({ handleMenuLinkClick = () => null }: AppMenuProps) {
  const location = useLocation();
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    lexica: false,
    test: false,
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
      return "active";
    }
    return "";
  };

  return (
    <List component="nav">
      <UnauthenticatedTemplate>
        <ListItemButton component={NavLink} to={Urls.pages.login.path}>
          <ListItemText primary={Urls.pages.login.name} />
        </ListItemButton>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ListItemButton component={NavLink} to={Urls.pages.home.path} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.pages.home.name} />
        </ListItemButton>
        <ListItemButton onClick={(e) => handleClick(e, "lexica")} className={getNoLinkClass("lexica")}>
          <ListItemText primary="Lexica" />
          {openState.lexica ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openState.lexica} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={Urls.pages.sets.path}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.pages.sets.name} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={(e) => handleClick(e, "test")} className={getNoLinkClass("test")}>
          <ListItemText primary="Test" />
          {openState.test ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openState.test} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={Urls.pages.test1.path}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.pages.test1.name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={Urls.pages.test2.path}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.pages.test2.name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={Urls.pages.test3.path}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.pages.test3.name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={Urls.pages.test4.path}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={Urls.pages.test4.name} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton component={NavLink} to={Urls.pages.about.path} onClick={handleMenuLinkClick}>
          <ListItemText primary={Urls.pages.about.name} />
        </ListItemButton>
      </AuthenticatedTemplate>
    </List>
  );
}
