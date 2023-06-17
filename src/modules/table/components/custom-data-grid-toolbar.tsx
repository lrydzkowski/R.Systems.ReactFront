import { Typography } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarQuickFilterProps } from "@mui/x-data-grid";
import "./custom-data-grid-toolbar.css";

interface ICustomDataGridToolbarProps {
  quickFilterProps: GridToolbarQuickFilterProps;
  header: JSX.Element;
  buttons: JSX.Element;
}

export default function CustomDataGridToolbar(props: ICustomDataGridToolbarProps) {
  return (
    <GridToolbarContainer className="grid-toolbar">
      <Typography variant="subtitle1" component="h2">
        {props.header}
      </Typography>
      <div className="vertical-separator"></div>
      <div className="sets-list--buttons">{props.buttons}</div>
      <div className="vertical-separator"></div>
      <GridToolbarQuickFilter {...props.quickFilterProps} />
    </GridToolbarContainer>
  );
}
