import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarQuickFilterProps } from "@mui/x-data-grid";
import "./custom-data-grid-toolbar.scoped.css";

interface ICustomDataGridToolbarProps {
  quickFilterProps: GridToolbarQuickFilterProps;
  buttons: JSX.Element;
}

export default function CustomDataGridToolbar(props: ICustomDataGridToolbarProps) {
  return (
    <GridToolbarContainer className="grid-toolbar">
      {props.buttons}
      <GridToolbarQuickFilter {...props.quickFilterProps} />
    </GridToolbarContainer>
  );
}
