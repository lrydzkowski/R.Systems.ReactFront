import { useAuth0 } from "@auth0/auth0-react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./app.css";
import Sidebar from "./components/layout/sidebar";

function App() {
  const { isLoading } = useAuth0();

  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div id="page">
          <div id="sidebar">
            <Sidebar />
          </div>
          <div id="content">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
