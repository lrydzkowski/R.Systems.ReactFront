import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Urls } from "@app/router/urls";
import "./app-breadcrumbs.css";

export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="app-breadcrumbs--content">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          to="/"
          component={RouterLink}
        >
          <HomeIcon fontSize="inherit" />
        </Link>
        {pathnames.map((_, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          let name = decodeURIComponent(pathnames[index]);
          let isValidLink = false;
          const pageInfo = Urls.getPageByPath(to);
          if (pageInfo !== null) {
            name = pageInfo.name ?? "";
            isValidLink = pageInfo.validLink ?? false;
          }

          return last || !isValidLink ? (
            <Typography color="text.primary" key={to}>
              {name.replaceAll("|", " ")}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" component={RouterLink} to={to} key={to}>
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
