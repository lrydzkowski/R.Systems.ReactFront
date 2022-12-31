import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridFilterModel,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
import { ListInfo } from "app/models/list-info";
import useProtectedListData from "app/hooks/use-protected-list-data";
import { getSets } from "lexica/common/api/sets-api";
import { Set } from "lexica/common/models/set";
import { useMemo, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import DialogError from "app/components/dialog-error";
import { Button } from "@mui/material";
import CustomDataGridToolbar from "table/components/custom-data-grid-toolbar";
import "./sets-list.css";
import ChooseModeDialog from "./choose-mode-dialog";
import LearningModeService from "lexica/common/services/learning-mode-service";

enum SelectedType {
  RowSelection,
  RowButton,
}

export default function SetsList() {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(100);
  const [sortingFieldName, setSortingFieldName] = useState<string>("path");
  const [sortingOrder, setSortingOrder] = useState<string>("desc");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<SelectedType | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [openChooseModeDialog, setOpenChooseModeDialog] = useState<boolean>(false);
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
            onClick={() => openSet(params.row.path)}
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
    {},
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

  const handleRefresh = () => setRefreshKey((x) => 1 - x);

  const openSet = (path: string) => {
    setSelectedPath(path);
    setSelectedType(SelectedType.RowButton);
    setOpenChooseModeDialog(true);
  };

  const openSets = () => {
    if (selectedPaths.length === 0) {
      return;
    }

    setSelectedType(SelectedType.RowSelection);
    setOpenChooseModeDialog(true);
  };

  const handleChooseModeDialogClose = (selectedMode: string | null) => {
    setOpenChooseModeDialog(false);
    setSelectedType(null);
    if (selectedMode === null) {
      return;
    }

    const path: string | null = LearningModeService.getPath(selectedMode);
    if (path === null) {
      return;
    }

    switch (selectedType) {
      case SelectedType.RowButton:
        if (selectedPath == null) {
          return;
        }

        navigate("/" + path.replace(":setPaths", encodePaths([selectedPath])));
        break;
      case SelectedType.RowSelection:
        if (selectedPaths.length === 0) {
          return;
        }

        navigate("/" + path.replace(":setPaths", encodePaths(selectedPaths)));
        break;
    }
  };

  const encodePaths = (paths: string[]): string => {
    return encodeURIComponent(paths.join("|"));
  };

  return (
    <>
      <DataGrid
        rows={setsData.data?.data ?? []}
        rowCount={setsData.data?.count ?? 0}
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
            buttons: (
              <div className="buttons">
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
                  disabled={setsData.processing || selectedPaths.length === 0}
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
        onSelectionModelChange={(gridSelectionModel: GridRowId[]) =>
          setSelectedPaths(gridSelectionModel.map((x) => x.toString()))
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
