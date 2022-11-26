import { Button } from "@mui/material";
import { GridToolbarContainer, GridToolbarQuickFilter, GridToolbarQuickFilterProps } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./custom-data-grid-toolbar.scoped.css";

export default function CustomDataGridToolbar({
  quickFilterProps,
  handleRefresh,
  isProcessing,
}: {
  quickFilterProps: GridToolbarQuickFilterProps;
  handleRefresh: () => void;
  isProcessing: boolean;
}) {
  return (
    <GridToolbarContainer className="grid-toolbar">
      <div className="buttons">
        <Button variant="text" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={isProcessing}>
          Refresh
        </Button>
      </div>
      <GridToolbarQuickFilter {...quickFilterProps} />
    </GridToolbarContainer>
  );
}
