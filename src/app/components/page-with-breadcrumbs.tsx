import { Divider } from "@mui/material";
import AppBreadcrumbs from "./app-breadcrumbs";
import "./page-with-breadcrumbs.scoped.css";

export default function PageWithBreadcrumbs(props: { children: JSX.Element }) {
  return (
    <>
      <div className="content-top">
        <div className="breadcrumbs-container">
          <AppBreadcrumbs />
        </div>
        <Divider variant="fullWidth" className="breadcrumbs-divider" />
      </div>
      <div className="content-bottom">{props.children}</div>
    </>
  );
}
