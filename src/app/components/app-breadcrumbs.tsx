import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Urls } from "app/routing/urls";

export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
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
          const pageInfo = Urls.getPageByPath(to);
          let name = "";
          let isValidLink = false;
          if (pageInfo !== null) {
            name = pageInfo.name ?? "";
            isValidLink = pageInfo.validLink ?? false;
          } else {
            name = decodeURIComponent(pathnames[index]);
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
    </>
  );
}
