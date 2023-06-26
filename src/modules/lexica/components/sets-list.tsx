import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
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
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [openChooseModeDialog, setOpenChooseModeDialog] = useState<boolean>(false);
  const columns = useMemo<GridColDef<Set>[]>(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 100,
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
    setIsErrorOpen(true);
    setErrorMessage(setsListErrors.get(SetsListErrorsKeys.unexpectedErrorInGettingList) ?? "");
  });
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tableDisabled = setsData.processing || isLoading;

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
      setIsErrorOpen(true);
      setErrorMessage(setsListErrors.get(SetsListErrorsKeys.unexpectedErrorInDeletingSets) ?? "");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DataGrid
        rows={setsData.data?.data ?? []}
        rowCount={setsData.data?.count ?? 0}
        loading={tableDisabled}
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
            quickFilterProps: { debounceMs: 500, disabled: tableDisabled },
            header: <>Sets</>,
            buttons: (
              <>
                <Button variant="text" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={tableDisabled}>
                  Refresh
                </Button>
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  onClick={() => navigateToNewSetForm()}
                  sx={{ color: "green" }}
                  disabled={tableDisabled}
                >
                  New
                </Button>
                <Button
                  variant="text"
                  startIcon={<OpenInNewIcon />}
                  onClick={() => openSets()}
                  disabled={tableDisabled || selectedIds.length === 0}
                >
                  Open
                </Button>
                <Button
                  variant="text"
                  startIcon={<DeleteOutlinedIcon />}
                  onClick={() => deleteSets()}
                  disabled={tableDisabled || selectedIds.length === 0}
                  sx={{ color: "red" }}
                >
                  Delete
                </Button>
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
        isErrorOpen={isErrorOpen}
        errorMsg={errorMessage}
        setIsErrorOpen={(state) => setIsErrorOpen(state)}
      ></DialogError>
      <ChooseModeDialog open={openChooseModeDialog} onClose={handleChooseModeDialogClose} />
      <DeleteSetConfirmationDialog
        isOpen={isDeleteConfirmationDialogOpen}
        onClose={handleCloseDeleteSetConfirmationDialog}
      />
    </>
  );
}
