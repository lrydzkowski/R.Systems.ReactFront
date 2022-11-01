import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import "./app.css";

export default function App() {
  const { inProgress } = useMsal();

  let isLoading = true;
  if (inProgress === InteractionStatus.None) {
    isLoading = false;
  }

  return (
    <>
      <CssBaseline />
      {isLoading && <p className="loading">Loading...</p>}
      {!isLoading && (
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
