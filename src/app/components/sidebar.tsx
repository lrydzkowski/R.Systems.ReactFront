import { Typography } from "@mui/material";
import UserInfo from "auth/components/user-info";
import Navigation from "./navigation";
import NavigationMobile from "./navigation-mobile";
import "./sidebar.scoped.css";

export default function Sidebar() {
  return (
    <>
      <div className="header">
        <div className="title">
          <Typography variant="h1">R.Systems</Typography>
        </div>
        <div className="navigation-mobile">
          <NavigationMobile />
        </div>
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
