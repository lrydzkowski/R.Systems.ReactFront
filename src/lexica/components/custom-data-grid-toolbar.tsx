import { Button } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarQuickFilterProps } from "@mui/x-data-grid";

export default function CustomDataGridToolbar({
  quickFilterProps,
  refresh,
}: {
  quickFilterProps: GridToolbarQuickFilterProps;
  refresh: () => void;
}) {
  return (
    <GridToolbarContainer>
      <Button variant="text" onClick={refresh}>
        Refresh
      </Button>
      <GridToolbarQuickFilter {...quickFilterProps} />
    </GridToolbarContainer>
  );
}
