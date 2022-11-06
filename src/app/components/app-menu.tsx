import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { linksNameMap } from "app/links-name-map";
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
        <ListItemButton component={NavLink} to={`/login`}>
          <ListItemText primary={linksNameMap["/login"].name} />
        </ListItemButton>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ListItemButton component={NavLink} to={`/home`} onClick={handleMenuLinkClick}>
          <ListItemText primary={linksNameMap["/home"].name} />
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
              to={`/lexica/sets`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/lexica/sets"].name} />
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
              to={`/test/test1`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test/test1"].name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test/test2`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test/test2"].name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test/test3`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test/test3"].name} />
            </ListItemButton>
            <ListItemButton
              className="subMenuListItemButtom"
              component={NavLink}
              to={`/test/test4`}
              onClick={handleMenuLinkClick}
            >
              <ListItemText primary={linksNameMap["/test/test4"].name} />
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
