import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePageCard({
  title,
  subtitle,
  redirectUrl,
}: {
  title: string;
  subtitle: string;
  redirectUrl: string;
}) {
  const navigate = useNavigate();

  const redirectToPage = () => {
    navigate(redirectUrl);
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={redirectToPage}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
