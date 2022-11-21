import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { linksNameMap } from "app/links-name-map";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./app-breadcrumbs.scoped.css";

export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <div className="breadcrumbs-container">
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
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const name = to in linksNameMap ? linksNameMap[to].name : decodeURIComponent(pathnames[index]);

            return last || !linksNameMap[to].validLink ? (
              <Typography color="text.primary" key={to}>
                {name}
              </Typography>
            ) : (
              <Link underline="hover" color="inherit" component={RouterLink} to={to} key={to}>
                {name}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
      <Divider variant="fullWidth" className="breadcrumbs-divider" />
    </>
  );
}
