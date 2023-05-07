import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./app.css";
import Sidebar from "./components/layout/sidebar";

function App() {
  const { inProgress } = useMsal();

  let isLoading = true;
  if (inProgress === InteractionStatus.None) {
    isLoading = false;
  }

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
