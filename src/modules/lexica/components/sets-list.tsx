import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogError from "@app/components/common/dialog-error";
import useProtectedListData from "@app/hooks/use-protected-list-data";
import { ListInfo } from "@app/models/list-info";
import { IListParameters, SortingOrder } from "@app/models/list-parameters";
import CustomDataGridToolbar from "@table/components/custom-data-grid-toolbar";
import { getSetsAsync } from "@lexica/api/sets-api";
import { Set } from "@lexica/models/set";
import { combineIds } from "@lexica/services/ids-parser";
import LearningModeService from "@lexica/services/learning-mode-service";
import ChooseModeDialog from "./choose-mode-dialog";
import "./sets-list.css";

export default function SetsList() {
  const [listParameters, setListParameters] = useState<IListParameters>({
    page: 0,
    pageSize: 25,
    sortingFieldName: "setId",
    sortingOrder: "desc",
    searchQuery: null,
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [openChooseModeDialog, setOpenChooseModeDialog] = useState<boolean>(false);
  const columns = useMemo<GridColDef<Set>[]>(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 50,
        getActions: (params: { row: { setId: number } }) => [
          <GridActionsCellItem
            key="open"
            icon={<OpenInNewIcon color="primary" />}
            onClick={() => openSet(params.row.setId)}
            label="Open"
          />,
        ],
      },
      { field: "setId", headerName: "Id", width: 70 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
      },
      { field: "name", headerName: "Name", flex: 1 },
    ],
    []
  );
  const setsData = useProtectedListData<ListInfo<Set>>(getSetsAsync, {}, listParameters, refreshKey, () => {
    setIsErrorOpen(true);
  });

  const handleRefresh = () => setRefreshKey((x) => 1 - x);

  const openSet = (setId: number) => {
    setSelectedIds([setId]);
    setOpenChooseModeDialog(true);
  };

  const openSets = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setOpenChooseModeDialog(true);
  };

  const handleChooseModeDialogClose = (selectedMode: string | null) => {
    setOpenChooseModeDialog(false);
    if (selectedMode === null) {
      return;
    }

    const path: string | null = LearningModeService.getPath(selectedMode);
    if (path === null) {
      return;
    }

    if (selectedIds.length === 0) {
      return;
    }

    navigate("/" + path.replace(":setIds", combineIds(selectedIds)));
  };

  return (
    <>
      <DataGrid
        rows={setsData.data?.data ?? []}
        rowCount={setsData.data?.count ?? 0}
        loading={setsData.processing}
        pageSizeOptions={[listParameters.pageSize]}
        pagination
        paginationModel={{ page: listParameters.page, pageSize: listParameters.pageSize }}
        paginationMode="server"
        onPaginationModelChange={(paginationModel: GridPaginationModel) => {
          setListParameters({
            ...listParameters,
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
          });
        }}
        columns={columns}
        checkboxSelection={true}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "sets-list--even" : "sets-list--odd"
        }
        getRowId={(row: Set) => row.setId}
        components={{ Toolbar: CustomDataGridToolbar }}
        componentsProps={{
          toolbar: {
            quickFilterProps: { debounceMs: 500 },
            buttons: (
              <div className="sets-list--buttons">
                <Button
                  variant="text"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  disabled={setsData.processing}
                >
                  Refresh
                </Button>
                <Button
                  variant="text"
                  startIcon={<OpenInNewIcon />}
                  onClick={() => openSets()}
                  disabled={setsData.processing || selectedIds.length === 0}
                >
                  Open
                </Button>
              </div>
            ),
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

          setListParameters({
            ...listParameters,
            sortingFieldName: model[0].field,
            sortingOrder: model[0].sort ?? SortingOrder.ascending,
          });
        }}
        filterMode="server"
        onFilterModelChange={(model: GridFilterModel) => {
          if (!model.quickFilterValues || model.quickFilterValues.length === 0) {
            setListParameters({
              ...listParameters,
              searchQuery: null,
            });
          } else {
            setListParameters({
              ...listParameters,
              searchQuery: model.quickFilterValues.join(" "),
            });
          }
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "setId", sort: "desc" }],
          },
        }}
        onRowSelectionModelChange={(gridSelectionModel: GridRowId[]) =>
          setSelectedIds(gridSelectionModel.map((x) => x as number))
        }
      />
      <DialogError
        isErrorOpen={isErrorOpen}
        errorMsg="An unexpected error has occurred in getting the list of sets."
        setIsErrorOpen={(state) => setIsErrorOpen(state)}
      ></DialogError>
      <ChooseModeDialog open={openChooseModeDialog} onClose={handleChooseModeDialogClose} />
    </>
  );
}
