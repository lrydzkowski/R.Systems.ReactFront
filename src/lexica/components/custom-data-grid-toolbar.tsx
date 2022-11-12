import { Button } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarQuickFilterProps } from "@mui/x-data-grid";
import "./custom-data-grid-toolbar.scoped.css";

export default function CustomDataGridToolbar({
  quickFilterProps,
  handleRefresh,
}: {
  quickFilterProps: GridToolbarQuickFilterProps;
  handleRefresh: () => void;
}) {
  return (
    <GridToolbarContainer className="grid-toolbar">
      <div className="buttons">
        <Button variant="text" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
      <GridToolbarQuickFilter {...quickFilterProps} />
    </GridToolbarContainer>
  );
}
