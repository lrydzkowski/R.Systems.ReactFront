import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IHomePageCardProps {
  title: string;
  subtitle: string;
  redirectUrl: string;
}

export default function HomePageCard(props: IHomePageCardProps) {
  const navigate = useNavigate();

  const redirectToPage = () => {
    navigate(props.redirectUrl);
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={redirectToPage}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
