import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useUrls from "@app/router/use-urls";
import "./app-breadcrumbs.css";

export default function AppBreadcrumbs() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([]);
  const { getPageByPath } = useUrls();

  useEffect(() => {
    const abortController = new AbortController();
    const createBreadcrumbsAsync = async function () {
      const pathNames = location.pathname.split("/").filter((x) => x);
      const breadcrumbs: IBreadcrumb[] = [];
      for (let index = 0; index < pathNames.length; index++) {
        const last = index === pathNames.length - 1;
        const to = `/${pathNames.slice(0, index + 1).join("/")}`;
        let name = decodeURIComponent(pathNames[index]);
        const pageInfo = getPageByPath(to);
        if (pageInfo === null) {
          breadcrumbs.push({
            name,
            link: to,
            isValidLink: false,
          });

          continue;
        }

        if (pageInfo.getNameAsync) {
          name = await pageInfo.getNameAsync(abortController, name);
        } else {
          name = pageInfo.name ?? "";
        }

        const isValidLink = pageInfo.validLink ?? false;
        breadcrumbs.push({
          name,
          link: to,
          isValidLink: isValidLink && !last,
        });
      }

      setBreadcrumbs(breadcrumbs);
    };

    createBreadcrumbsAsync();

    return () => abortController.abort();
  }, [location.pathname]);

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
        {breadcrumbs.map((breadcrumb) => {
          return breadcrumb.isValidLink ? (
            <Link underline="hover" color="inherit" component={RouterLink} to={breadcrumb.link} key={breadcrumb.link}>
              {breadcrumb.name}
            </Link>
          ) : (
            <Typography color="text.primary" key={breadcrumb.link}>
              {breadcrumb.name}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}

interface IBreadcrumb {
  name: string;
  link: string;
  isValidLink: boolean;
}
