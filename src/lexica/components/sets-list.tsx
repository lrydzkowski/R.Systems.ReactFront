import { DataGrid, GridActionsCellItem, GridColumns, GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { ListInfo } from "app/models/list-info";
import useProtectedListData from "auth/hooks/use-protected-list-data";
import { getSets } from "lexica/api/sets-api";
import { Set } from "lexica/models/set";
import { useMemo, useState } from "react";
import CustomDataGridToolbar from "./custom-data-grid-toolbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./sets-list.css";
import { useNavigate } from "react-router-dom";
import DialogError from "app/components/dialog-error";

export default function SetsList() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(100);
  const [sortingFieldName, setSortingFieldName] = useState<string>("path");
  const [sortingOrder, setSortingOrder] = useState<string>("desc");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const columns = useMemo<GridColumns<Set>>(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            key="open"
            icon={<OpenInNewIcon color="primary" />}
            onClick={() => navigate(`/lexica/sets/${encodeURIComponent(params.row.path)}`)}
            label="Open"
          />,
        ],
      },
      { field: "path", headerName: "File Path", flex: 1 },
    ],
    []
  );
  const setsData = useProtectedListData<ListInfo<Set>>(
    getSets,
    page + 1,
    pageSize,
    sortingFieldName,
    sortingOrder,
    searchQuery,
    refreshKey,
    () => {
      setIsErrorOpen(true);
    }
  );

  return (
    <>
      <DataGrid
        rows={setsData.data?.data ?? []}
        rowCount={setsData.data?.numberOfAllRows ?? 0}
        loading={setsData.processing}
        rowsPerPageOptions={[pageSize]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
        checkboxSelection={true}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd")}
        getRowId={(row: Set) => row.path}
        components={{ Toolbar: CustomDataGridToolbar }}
        componentsProps={{
          toolbar: {
            quickFilterProps: { debounceMs: 500 },
            handleRefresh: () => setRefreshKey((x) => x + 1),
            isProcessing: setsData.processing,
          },
        }}
        disableColumnFilter
        disableColumnMenu
        sortingMode="server"
        sortingOrder={["desc", "asc"]}
        onSortModelChange={(model: GridSortModel) => {
          if (model.length === 0) {
            return;
          }
          setSortingFieldName(model[0].field);
          setSortingOrder(model[0].sort ?? "asc");
        }}
        filterMode="server"
        onFilterModelChange={(model: GridFilterModel) => {
          if (!model.quickFilterValues || model.quickFilterValues.length === 0) {
            setSearchQuery(null);
          } else {
            setSearchQuery(model.quickFilterValues.join(" "));
          }
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "path", sort: "desc" }],
          },
        }}
      />
      <DialogError
        isErrorOpen={isErrorOpen}
        errorMsg="An unexpected error has occurred in getting the list of sets."
        setIsErrorOpen={(state) => setIsErrorOpen(state)}
      ></DialogError>
    </>
  );
}
