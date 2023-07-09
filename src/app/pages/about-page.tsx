import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Link, Typography } from "@mui/material";
import "./about-page.css";

export default function AboutPage() {
  const year: number = new Date().getFullYear();

  return (
    <div className="about-page">
      <Typography paragraph={true}>r-systems-react-front 1.0.0</Typography>
      <Typography paragraph={true}>Copyright © {year} Łukasz Rydzkowski</Typography>
      <Typography paragraph={true}>Test</Typography>
      <Link href="https://github.com/lrydzkowski" target="_blank" rel="noreferrer">
        <IconButton size="large" style={{ color: "black" }}>
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Link>
      <Link href="mailto: lukasz.rydzkowski@gmail.com">
        <IconButton size="large" color="primary">
          <EmailIcon fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}
