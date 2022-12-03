import { AppBar, Divider } from "@mui/material";
import UserInfo from "auth/components/user-info";
import Header from "./header";
import Navigation from "./navigation";
import NavigationMobile from "./navigation-mobile";
import "./sidebar.scoped.css";

export default function Sidebar() {
  return (
    <>
      <AppBar position="static" className="header">
        <div className="title">
          <Header />
        </div>
        <div className="navigation-mobile">
          <NavigationMobile />
        </div>
      </AppBar>
      <div className="divider">
        <Divider variant="middle" />
      </div>
      <div className="navigation">
        <Navigation />
      </div>
      <div className="user-info">
        <UserInfo />
      </div>
    </>
  );
}
