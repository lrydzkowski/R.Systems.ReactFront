import { Typography } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import "./custom-data-grid-toolbar-without-filter.css";

interface ICustomDataGridToolbarWithoutFilterProps {
  header: JSX.Element;
  buttons: JSX.Element;
}

export default function CustomDataGridToolbarWithoutFilter(props: ICustomDataGridToolbarWithoutFilterProps) {
  return (
    <GridToolbarContainer className="grid-toolbar">
      <Typography variant="subtitle1" component="h2">
        {props.header}
      </Typography>
      <div className="vertical-separator"></div>
      <div className="sets-list--buttons">{props.buttons}</div>
      <div className="vertical-separator"></div>
    </GridToolbarContainer>
  );
}
