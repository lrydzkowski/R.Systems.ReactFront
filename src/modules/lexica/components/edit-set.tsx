import { yupResolver } from "@hookform/resolvers/yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RefreshIcon from "@mui/icons-material/Refresh";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorsHandler } from "@app/api/services/errors-handler";
import DialogError from "@app/components/common/dialog-error";
import { useFocusHandler } from "@app/hooks/use-focus-handler";
import { useLoadingAnimationVisibility } from "@app/hooks/use-loading-animation-visibility";
import { ErrorCodes } from "@app/models/error-codes";
import { IErrorHandlingInfo } from "@app/models/error-handling-info";
import { IErrorWindowState } from "@app/models/error-window-state";
import useUrls, { Pages } from "@app/router/use-urls";
import useSetsApi from "@lexica/api/use-sets-api";
import { ICreateSetRequest } from "@lexica/models/create-set-request";
import { EditSetErrorsKeys, editSetErrors } from "@lexica/models/edit-set-errors";
import { IUpdateSetRequest } from "@lexica/models/update-set-request";
import { WordType } from "@lexica/models/word-type";
import { mapToWordType } from "@lexica/services/mode-type-mapper";
import { Set } from "../models/set";
import "./edit-set.css";

interface IEditSetProps {
  setId: number | null;
}

const setSchema = yup
  .object({
    name: yup.string().required("Name is required").max(200, "Name must be at most ${max} characters"),
    entries: yup
      .array()
      .of(
        yup.object({
          word: yup.string().required("Word is required").max(200, "Word must be at most ${max} characters"),
          wordType: yup.string().required("Word Type is required"),
          translations: yup
            .string()
            .required("Translations are required")
            .max(200, "Translations must be at most ${max} characters"),
        })
      )
      .min(1)
      .required(),
  })
  .required();
type SetFormInput = yup.InferType<typeof setSchema>;

const defaultValues: SetFormInput = {
  name: "",
  entries: [
    {
      word: "",
      wordType: WordType.Noun,
      translations: "",
    },
  ],
};

const serverValidationErrors = new Map<string, IErrorHandlingInfo>([
  [ErrorCodes.unexpected, { message: "An unexpected error has occured.", fieldName: null }],
  ["SetName_UniqueValidator", { message: "Set with the given name exists.", fieldName: "name" }],
  ["Entries_UniqueValidator", { message: "You cannot create a set with repeated words.", fieldName: null }],
]);

export default function EditSet(props: IEditSetProps) {
  const { getPath } = useUrls();
  const { getSetAsync, createSetAsync, updateSetAsync } = useSetsApi();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setFocus,
    setValue,
  } = useForm<SetFormInput>({
    defaultValues,
    resolver: yupResolver(setSchema),
  });
  const { fields, append, remove, replace } = useFieldArray({ name: "entries", control });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const [errorWindowState, setErrorWindowState] = useState<IErrorWindowState>({
    isOpen: false,
    message: "",
    onCloseEvent: () => null,
  });
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [numOfEntries, setNumOfEntries] = useState<number>(0);
  const isLoadingAnimationVisible = useLoadingAnimationVisibility({ isLoading });
  useFocusHandler({ isLoading });

  useEffect(() => {
    if (props.setId === null) {
      return;
    }

    const abortController = new AbortController();
    const getSet = async () => {
      try {
        setIsLoading(true);
        const response = await getSetAsync(abortController, { setId: props.setId?.toString() ?? "" });
        if (!response) {
          return;
        }

        const data: Set = response.data;

        setValue("name", data.name);
        const entries = data.entries.map((entry) => ({
          word: entry.word,
          wordType: mapToWordType(entry.wordType),
          translations: entry.translations.join(", "),
        }));
        replace(entries);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setErrorWindowState({
          isOpen: true,
          message: editSetErrors.get(EditSetErrorsKeys.unexpectedErrorInGettingSet) ?? "",
          onCloseEvent: () => navigate(getPath(Pages.sets)),
        });
      }
    };

    getSet();

    return () => abortController.abort();
  }, [props.setId, navigate, refreshKey]);

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  useEffect(() => {
    if (submitError === null) {
      return;
    }

    const errors = ErrorsHandler.handleErrorMessages(submitError, serverValidationErrors, setError);
    if (errors.length > 0) {
      setErrorMessages(errors);
    }
  }, [submitError, setError]);

  useEffect(() => {
    setNumOfEntries(fields.length);
  }, [fields]);

  const onSubmit: SubmitHandler<SetFormInput> = async (data: SetFormInput) => {
    setIsLoading(true);

    try {
      setErrorMessages(null);
      if (props.setId === null) {
        const createRequest: ICreateSetRequest = mapFormDataToCreateRequest(data);
        await createSetAsync(new AbortController(), createRequest);
      } else {
        const updateRequest: IUpdateSetRequest = mapFormDataToUpdateRequest(data);
        await updateSetAsync(new AbortController(), updateRequest);
      }

      navigate(getPath(Pages.sets));
    } catch (error) {
      setSubmitError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapFormDataToCreateRequest = (data: SetFormInput): ICreateSetRequest => {
    return {
      setName: data.name,
      entries: data.entries.map((entry) => ({
        word: entry.word?.trim(),
        wordType: entry.wordType,
        translations: entry.translations
          .split(",")
          .map((translation) => translation?.trim())
          .filter((translation) => translation != null),
      })),
    };
  };

  const mapFormDataToUpdateRequest = (data: SetFormInput): IUpdateSetRequest => {
    const request = mapFormDataToCreateRequest(data);

    return {
      ...request,
      setId: props.setId as number,
    };
  };

  return (
    <div className="new-set-page--container">
      <Typography variant="subtitle1" component="h2">
        {props.setId === null ? <span>New Set</span> : <span>Edit Set</span>}
        <span className="entries-counter">(entries: {numOfEntries})</span>
      </Typography>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-body">
            <div className="name field">
              <Controller
                name="name"
                defaultValue={""}
                control={control}
                rules={{ required: true, maxLength: 200 }}
                render={({ field: { ref, ...newField } }) => {
                  return (
                    <TextField
                      label="Name"
                      variant="outlined"
                      error={errors.name ? true : false}
                      helperText={errors.name ? errors.name.message : ""}
                      disabled={isLoading}
                      {...newField}
                      inputRef={ref}
                    />
                  );
                }}
              />
            </div>
            {fields.map((field, i) => (
              <div className="entry" key={field.id}>
                <div className="entry-fields">
                  <div className="word field">
                    <Controller
                      name={`entries.${i}.word`}
                      defaultValue={""}
                      control={control}
                      rules={{ required: true, maxLength: 200 }}
                      render={({ field: { ref, ...newField } }) => (
                        <TextField
                          label="Word"
                          variant="outlined"
                          error={errors.entries && errors.entries[i]?.word ? true : false}
                          helperText={errors.entries && errors.entries[i]?.word ? errors.entries[i]?.word?.message : ""}
                          disabled={isLoading}
                          {...newField}
                          inputRef={ref}
                          spellCheck={false}
                        />
                      )}
                    />
                  </div>
                  <div className="word-type field">
                    <Controller
                      name={`entries.${i}.wordType`}
                      defaultValue={WordType.Noun}
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={errors.entries && errors.entries[i]?.wordType ? true : false}>
                          <InputLabel id="word-type-0-label">Word Type</InputLabel>
                          <Select label="Word Type" labelId="word-type-0-label" {...field} disabled={isLoading}>
                            <MenuItem value={WordType.Noun}>Noun</MenuItem>
                            <MenuItem value={WordType.Verb}>Verb</MenuItem>
                            <MenuItem value={WordType.Adjective}>Adjective</MenuItem>
                            <MenuItem value={WordType.Adverb}>Adverb</MenuItem>
                          </Select>
                          {errors.entries && errors.entries[i]?.wordType && (
                            <FormHelperText>errors.entries[i]?.wordType.message</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </div>
                  <div className="translations field">
                    <Controller
                      name={`entries.${i}.translations`}
                      defaultValue={""}
                      control={control}
                      rules={{ required: true, maxLength: 200 }}
                      render={({ field: { ref, ...newField } }) => (
                        <TextField
                          label="Translations"
                          variant="outlined"
                          error={errors.entries && errors.entries[i]?.translations ? true : false}
                          helperText={
                            errors.entries && errors.entries[i]?.translations
                              ? errors.entries[i]?.translations?.message
                              : ""
                          }
                          disabled={isLoading}
                          {...newField}
                          inputRef={ref}
                          spellCheck={false}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="buttons">
                  {i === fields.length - 1 && (
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={() => append(defaultValues.entries[0], { shouldFocus: true })}
                      disabled={isLoading}
                      className="add-button"
                    >
                      <ControlPointIcon fontSize="inherit" />
                    </IconButton>
                  )}
                  {i > 0 && (
                    <IconButton
                      color="error"
                      size="large"
                      onClick={() => remove(i)}
                      disabled={isLoading}
                      className="remove-button"
                    >
                      <RemoveCircleOutlineIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </div>
              </div>
            ))}
          </div>
          {errorMessages && (
            <div className="error">
              {errorMessages.map((errorMessage, index) => (
                <p key={index}>{errorMessage}</p>
              ))}
            </div>
          )}
          <div className="main-buttons">
            <Button
              variant="contained"
              type="submit"
              size="medium"
              endIcon={<SaveAsIcon />}
              color="success"
              disabled={isLoading}
            >
              {props.setId === null ? "Create" : "Update"}
            </Button>
            {props.setId !== null && (
              <Button
                variant="contained"
                type="button"
                size="medium"
                endIcon={<RefreshIcon />}
                disabled={isLoading}
                onClick={() => setRefreshKey((x) => 1 - x)}
              >
                Refresh
              </Button>
            )}
          </div>
        </form>
        {isLoadingAnimationVisible && (
          <div className="curtain">
            <div className="loading">
              <CircularProgress />
            </div>
          </div>
        )}
      </div>
      <DialogError
        isErrorOpen={errorWindowState.isOpen}
        errorMsg={errorWindowState.message}
        setIsErrorOpen={() => {
          if (!errorWindowState.onCloseEvent) {
            return;
          }

          errorWindowState.onCloseEvent();
        }}
      ></DialogError>
    </div>
  );
}
