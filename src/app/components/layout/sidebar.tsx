import { useAuth0 } from "@auth0/auth0-react";
import { Divider } from "@mui/material";
import LogoutButton from "@app/components/navigation/logout-button";
import Navigation from "@app/components/navigation/navigation";
import NavigationMobile from "@app/components/navigation/navigation-mobile";
import Profile from "../navigation/profile";
import "./sidebar.css";

export default function Sidebar() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div className="sidebar--header">
        <div className="sidebar--title">
          <h1>R.Systems</h1>
        </div>
        <div className="sidebar--navigation-mobile">
          <NavigationMobile />
        </div>
      </div>
      <Divider variant="middle" />
      <div className="sidebar--navigation">
        <Navigation />
      </div>
      {isAuthenticated && (
        <>
          <Divider variant="middle" className="sidebar--user-info-divider" />
          <div className="sidebar--user-info">
            <Profile />
            <LogoutButton />
          </div>
        </>
      )}
    </>
  );
}
