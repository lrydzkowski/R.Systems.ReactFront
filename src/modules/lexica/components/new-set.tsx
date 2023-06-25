import { yupResolver } from "@hookform/resolvers/yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
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
import { ErrorCodes } from "@app/models/error-codes";
import { IErrorHandlingInfo } from "@app/models/error-handling-info";
import { Pages, Urls } from "@app/router/urls";
import { createSetAsync } from "@lexica/api/sets-api";
import { ICreateSetRequest } from "@lexica/models/create-set-request";
import { WordType } from "@lexica/models/word-type";
import "./new-set.css";

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

export default function NewSet() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<SetFormInput>({
    defaultValues,
    resolver: yupResolver(setSchema),
  });
  const { fields, append, remove } = useFieldArray<SetFormInput>({ name: "entries", control });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [isLoading]);

  useEffect(() => {
    if (submitError === null) {
      return;
    }

    const errors = ErrorsHandler.handleErrorMessages(submitError, serverValidationErrors, setError);
    if (errors.length > 0) {
      setErrorMessages(errors);
    }
  }, [submitError, setError]);

  const onSubmit: SubmitHandler<SetFormInput> = async (data: SetFormInput) => {
    setIsLoading(true);

    try {
      setErrorMessages(null);
      const request: ICreateSetRequest = mapFormDataToRequest(data);
      await createSetAsync(new AbortController(), request);

      navigate(Urls.getPath(Pages.sets));
    } catch (error) {
      setSubmitError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapFormDataToRequest = (data: SetFormInput): ICreateSetRequest => {
    return {
      setName: data.name,
      entries: data.entries.map((entry) => ({
        word: entry.word?.trim(),
        wordType: entry.wordType,
        translations: entry.translations
          .split(" ")
          .map((translation) => translation?.trim())
          .filter((translation) => translation != null),
      })),
    };
  };

  return (
    <div className="new-set-page--container">
      <Typography variant="subtitle1" component="h2">
        New Set
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
            {fields.map((_, i) => (
              <div className="entry" key={i}>
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
                      />
                    )}
                  />
                </div>
                <div className="buttons">
                  {i === fields.length - 1 && (
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={() => append(defaultValues.entries[0], { shouldFocus: true })}
                      disabled={isLoading}
                    >
                      <ControlPointIcon fontSize="inherit" />
                    </IconButton>
                  )}
                  {i > 0 && (
                    <IconButton color="error" size="large" onClick={() => remove(i)} disabled={isLoading}>
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
            <Button variant="contained" type="submit" size="medium" disabled={isLoading}>
              Create
            </Button>
          </div>
        </form>
        {isLoading && (
          <div className="curtain">
            <div className="loading">
              <CircularProgress />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
