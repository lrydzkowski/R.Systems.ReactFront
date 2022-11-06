import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListInfo } from "app/models/list-info";
import useProtectedData from "auth/hooks/use-protected-data";
import useProtectedListData from "auth/hooks/use-protected-list-data";
import { getSets } from "lexica/api/sets-api";
import { Set } from "lexica/models/set";
import { useState } from "react";
import CustomDataGridToolbar from "./custom-data-grid-toolbar";
import "./sets-list.css";

export default function SetsList() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(100);
  const setsData = useProtectedListData<ListInfo<Set>>(getSets, page, pageSize);

  const columns: GridColDef[] = [{ field: "path", headerName: "File Path", width: 300 }];

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
          },
        }}
        disableColumnFilter
      />
    </>
  );
}
