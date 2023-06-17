import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import DialogError from "@app/components/common/dialog-error";
import { useProtectedMultipleData } from "@app/hooks/use-protected-data";
import CustomDataGridToolbarWithoutFilter from "@table/components/custom-data-grid-toolbar-without-filter";
import { getSetAsync } from "@lexica/api/sets-api";
import { Entry } from "@lexica/models/entry";
import { Set } from "@lexica/models/set";
import "./set-details.css";

interface ISetDetailsProps {
  setIds: number[];
}

export default function SetDetails(props: ISetDetailsProps) {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const columns = useMemo<GridColDef<Entry>[]>(
    () => [
      { field: "wordType", headerName: "Word Type", width: 140, sortable: false },
      {
        field: "word",
        headerName: "Word",
        width: 300,
        sortable: false,
      },
      {
        field: "translations",
        headerName: "Translations",
        flex: 1,
        minWidth: 300,
        sortable: false,
        valueGetter: (params) => {
          return params.value.join(", ");
        },
      },
    ],
    []
  );
  const setData = useProtectedMultipleData<Set>(
    props.setIds.map((setId) => ({
      getDataFunc: getSetAsync,
      urlParameters: { setId: setId.toString() },
      requestParameters: {},
    })),
    refreshKey,
    () => {
      setIsErrorOpen(true);
    }
  );
  const entries = useMemo(() => {
    return setData.data?.flatMap((set) => set.entries);
  }, [setData]);

  const handleRefresh = () => setRefreshKey((x) => 1 - x);

  return (
    <>
      <DataGrid
        rows={entries ?? []}
        rowCount={entries?.length ?? 0}
        loading={setData.processing}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "sets-list--even" : "sets-list--odd"
        }
        getRowId={(row: Entry) => row.word}
        slots={{ toolbar: CustomDataGridToolbarWithoutFilter }}
        slotProps={{
          toolbar: {
            quickFilterProps: { debounceMs: 500 },
            header: <>Content</>,
            buttons: (
              <>
                <Button
                  variant="text"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  disabled={setData.processing}
                >
                  Refresh
                </Button>
              </>
            ),
          },
        }}
        disableColumnFilter
        disableColumnMenu
        hideFooter={true}
        rowSelection={false}
      />
      <DialogError
        isErrorOpen={isErrorOpen}
        errorMsg="An unexpected error has occurred in getting the set."
        setIsErrorOpen={(state) => setIsErrorOpen(state)}
      ></DialogError>
    </>
  );
}
