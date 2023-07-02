import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, IconButton } from "@mui/material";
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
import { useFocusHandler } from "@app/hooks/use-focus-handler";
import { useLoadingAnimationVisibility } from "@app/hooks/use-loading-animation-visibility";
import useProtectedListData from "@app/hooks/use-protected-list-data";
import { IErrorWindowState } from "@app/models/error-window-state";
import { ListInfo } from "@app/models/list-info";
import { IListParameters, SortingOrder } from "@app/models/list-parameters";
import { Pages, Urls } from "@app/router/urls";
import CustomDataGridToolbar from "@table/components/custom-data-grid-toolbar";
import { deleteSetsAsync, getSetsAsync } from "@lexica/api/sets-api";
import { Set } from "@lexica/models/set";
import { SetsListErrorsKeys, setsListErrors } from "@lexica/models/sets-list-errors";
import { combineIds } from "@lexica/services/ids-parser";
import LearningModeService from "@lexica/services/learning-mode-service";
import ChooseModeDialog from "./choose-mode-dialog";
import DeleteSetConfirmationDialog from "./delete-set-confirmation-dialog";
import "./sets-list.css";

export default function SetsList() {
  const [listParameters, setListParameters] = useState<IListParameters>({
    page: 0,
    pageSize: 25,
    sortingFieldName: "setId",
    sortingOrder: "desc",
    searchQuery: null,
  });
  const [chosenId, setChosenId] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [errorWindowState, setErrorWindowState] = useState<IErrorWindowState>({
    isOpen: false,
    message: "",
    onCloseEvent: null,
  });
  const navigate = useNavigate();
  const [openChooseModeDialog, setOpenChooseModeDialog] = useState<boolean>(false);
  const columns = useMemo<GridColDef<Set>[]>(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 150,
        getActions: (params: { row: { setId: number } }) => [
          <GridActionsCellItem
            key="open"
            icon={<OpenInNewIcon color="primary" />}
            onClick={() => openSet(params.row.setId)}
            label="Open"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteOutlinedIcon sx={{ color: "red" }} />}
            onClick={() => deleteSet(params.row.setId)}
            label="Delete"
          />,
          <GridActionsCellItem
            key="edit"
            icon={<EditOutlinedIcon color="primary" />}
            onClick={() => editSet(params.row.setId)}
            label="Edit"
          />,
        ],
      },
      { field: "setId", headerName: "Id", width: 70 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
      },
      { field: "name", headerName: "Name", flex: 1, minWidth: 300 },
    ],
    []
  );
  const setsData = useProtectedListData<ListInfo<Set>>(getSetsAsync, {}, listParameters, refreshKey, () => {
    setErrorWindowState({
      isOpen: true,
      message: setsListErrors.get(SetsListErrorsKeys.unexpectedErrorInGettingList) ?? "",
      onCloseEvent: null,
    });
  });
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tableDisabled = setsData.processing || isLoading;
  const isLoadingAnimationVisible = useLoadingAnimationVisibility({ isLoading: tableDisabled });
  useFocusHandler({ isLoading: tableDisabled });

  const handleRefresh = () => setRefreshKey((x) => 1 - x);

  const navigateToNewSetForm = () => {
    navigate(Urls.getPath(Pages.newSet));
  };

  const openSet = (setId: number) => {
    setChosenId(setId);
    setOpenChooseModeDialog(true);
  };

  const deleteSet = (setId: number) => {
    setChosenId(setId);
    setIsDeleteConfirmationDialogOpen(true);
  };

  const openSets = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setOpenChooseModeDialog(true);
  };

  const deleteSets = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setIsDeleteConfirmationDialogOpen(true);
  };

  const handleChooseModeDialogClose = (selectedMode: string | null) => {
    setOpenChooseModeDialog(false);
    if (selectedMode === null) {
      setChosenId(0);

      return;
    }

    const path: string | null = LearningModeService.getPath(selectedMode);
    if (path === null) {
      return;
    }

    let ids = [];
    if (chosenId === 0) {
      ids = [...selectedIds];
    } else {
      ids.push(chosenId);
    }

    if (ids.length === 0) {
      return;
    }

    navigate("/" + path.replace(":setIds", combineIds(ids)));
  };

  const handleCloseDeleteSetConfirmationDialog = async (agreed: boolean) => {
    try {
      setIsDeleteConfirmationDialogOpen(false);
      if (!agreed) {
        setChosenId(0);

        return;
      }

      let ids = [];
      if (chosenId === 0) {
        ids = [...selectedIds];
      } else {
        ids.push(chosenId);
      }

      if (ids.length === 0) {
        return;
      }

      setIsLoading(true);
      await deleteSetsAsync(new AbortController(), ids);
      setRefreshKey((x) => 1 - x);
    } catch (error) {
      setErrorWindowState({
        isOpen: true,
        message: setsListErrors.get(SetsListErrorsKeys.unexpectedErrorInDeletingSets) ?? "",
        onCloseEvent: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editSet = (setId: number) => {
    if (!setId) {
      return;
    }

    navigate(Urls.getPath(Pages.editSet).replace(":setId", setId.toString()));
  };

  return (
    <>
      <DataGrid
        rows={setsData.data?.data ?? []}
        rowCount={setsData.data?.count ?? 0}
        loading={isLoadingAnimationVisible}
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
        slots={{ toolbar: CustomDataGridToolbar }}
        slotProps={{
          toolbar: {
            quickFilterProps: { debounceMs: 500, disabled: tableDisabled, autoFocus: true },
            header: <>Sets</>,
            buttons: (
              <>
                <Button
                  className="full-button"
                  variant="text"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  disabled={tableDisabled}
                >
                  <span className="label">Refresh</span>
                </Button>
                <IconButton
                  className="small-button"
                  onClick={handleRefresh}
                  disabled={tableDisabled}
                  color="primary"
                  size="large"
                >
                  <RefreshIcon fontSize="inherit" />
                </IconButton>
                <Button
                  className="full-button"
                  variant="text"
                  startIcon={<AddIcon />}
                  onClick={navigateToNewSetForm}
                  sx={{ color: "green" }}
                  disabled={tableDisabled}
                >
                  <span className="label">New</span>
                </Button>
                <IconButton
                  className="small-button"
                  onClick={navigateToNewSetForm}
                  disabled={tableDisabled}
                  sx={{ color: "green" }}
                  size="large"
                >
                  <AddCircleOutlineIcon fontSize="inherit" />
                </IconButton>
                <Button
                  className="full-button"
                  variant="text"
                  startIcon={<OpenInNewIcon />}
                  onClick={openSets}
                  disabled={tableDisabled || selectedIds.length === 0}
                >
                  <span className="label">Open</span>
                </Button>
                <IconButton
                  className="small-button"
                  onClick={openSets}
                  disabled={tableDisabled || selectedIds.length === 0}
                  size="large"
                  color="primary"
                >
                  <OpenInNewIcon fontSize="inherit" />
                </IconButton>
                <Button
                  className="full-button"
                  variant="text"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={deleteSets}
                  disabled={tableDisabled || selectedIds.length === 0}
                  sx={{ color: "red" }}
                >
                  <span className="label">Delete</span>
                </Button>
                <IconButton
                  className="small-button"
                  onClick={deleteSets}
                  disabled={tableDisabled || selectedIds.length === 0}
                  sx={{ color: "red" }}
                  size="large"
                >
                  <DeleteOutlinedIcon fontSize="inherit" />
                </IconButton>
              </>
            ),
          },
        }}
        disableColumnFilter
        disableColumnMenu
        sortingMode="server"
        sortingOrder={["desc", "asc"]}
        onSortModelChange={(model: GridSortModel) => {
          if (tableDisabled) {
            return;
          }

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
          if (tableDisabled) {
            return;
          }

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
        isErrorOpen={errorWindowState.isOpen}
        errorMsg={errorWindowState.message}
        setIsErrorOpen={() => setErrorWindowState({ isOpen: false, message: "", onCloseEvent: null })}
      ></DialogError>
      <ChooseModeDialog open={openChooseModeDialog} onClose={handleChooseModeDialogClose} />
      <DeleteSetConfirmationDialog
        isOpen={isDeleteConfirmationDialogOpen}
        onClose={handleCloseDeleteSetConfirmationDialog}
      />
    </>
  );
}
