import { Divider } from "@mui/material";
import AppBreadcrumbs from "./app-breadcrumbs";
import "./page-with-breadcrumbs.css";

interface IPageWithBreadcrumbsProps {
  children: JSX.Element;
}

export default function PageWithBreadcrumbs(props: IPageWithBreadcrumbsProps) {
  return (
    <>
      <div className="page-with-breadcrumbs--content-top">
        <div className="page-with-breadcrumbs--container">
          <AppBreadcrumbs />
        </div>
        <Divider variant="fullWidth" className="page-with-breadcrumbs--divider" />
      </div>
      <div className="page-with-breadcrumbs--content-bottom">{props.children}</div>
    </>
  );
}
