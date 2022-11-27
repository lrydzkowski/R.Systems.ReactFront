import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarQuickFilterProps } from "@mui/x-data-grid";
import "./custom-data-grid-toolbar.scoped.css";

interface ICustomDataGridToolbarProps {
  quickFilterProps: GridToolbarQuickFilterProps;
  children: JSX.Element;
}

export default function CustomDataGridToolbar({ quickFilterProps, children }: ICustomDataGridToolbarProps) {
  return (
    <GridToolbarContainer className="grid-toolbar">
      {children}
      <GridToolbarQuickFilter {...quickFilterProps} />
    </GridToolbarContainer>
  );
}
