import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { linksNameMap } from "app/links-name-map";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./app-menu.scoped.css";

export interface AppMenuProps {
  handleMenuLinkClick?: () => void;
}

export default function AppMenu({ handleMenuLinkClick = () => null }: AppMenuProps) {
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    test1: false,
    test2: false,
  });

  const handleClick = (key: string) => {
    const newOpenState = { ...openState };
    newOpenState[key] = !newOpenState[key];
    setOpenState(newOpenState);
  };

  return (
    <List component="nav">
      <UnauthenticatedTemplate>
        <ListItemButton component={NavLink} to={`/login`}>
          <ListItemText primary={linksNameMap["/login"].name} />
        </ListItemButton>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ListItemButton component={NavLink} to={`/home`} onClick={handleMenuLinkClick}>
          <ListItemText primary={linksNameMap["/home"].name} />
        </ListItemButton>
        <ListItemButton component={NavLink} to={`/sets`} onClick={handleMenuLinkClick}>
          <ListItemText primary={linksNameMap["/sets"].name} />
        </ListItemButton>
        <ListItemButton onClick={() => handleClick("test1")}>
          <ListItemText primary="Test1" />
          {openState.test1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openState.test1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test1/test1`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test1/test1"].name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test1/test2`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test1/test2"].name} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => handleClick("test2")}>
          <ListItemText primary="Test2" />
          {openState.test2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openState.test2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test2/test1`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test2/test1"].name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test2/test2`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test2/test2"].name} />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton component={NavLink} to={`/about`} onClick={handleMenuLinkClick}>
          <ListItemText primary={linksNameMap["/about"].name} />
        </ListItemButton>
      </AuthenticatedTemplate>
    </List>
  );
}
