import { yupResolver } from "@hookform/resolvers/yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ErrorsHandler } from "@app/api/services/errors-handler";
import { ErrorCodes } from "@app/models/error-codes";
import { IErrorInfo } from "@app/models/error-info";
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

const serverValidationErrors: Map<string, string> = new Map<string, string>([
  [ErrorCodes.unexpected, "An unexpected error has occured."],
  ["SetName_UniqueValidator", "Set with the given name exists."],
]);

export default function NewSet() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SetFormInput>({
    defaultValues,
    resolver: yupResolver(setSchema),
  });
  const { fields, append, remove } = useFieldArray<SetFormInput>({ name: "entries", control });
  const nameFieldRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState<string[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    nameFieldRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<SetFormInput> = async (data: SetFormInput) => {
    try {
      setErrorMessages(null);
      const request: ICreateSetRequest = mapFormDataToRequest(data);
      await createSetAsync(new AbortController(), request);

      navigate(Urls.getPath(Pages.sets));
    } catch (error) {
      setErrorMessages(ErrorsHandler.getErrorMessages(error, serverValidationErrors));
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
                render={({ field }) => (
                  <TextField
                    label="Name"
                    variant="outlined"
                    inputRef={nameFieldRef}
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ""}
                    {...field}
                  />
                )}
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
                        {...newField}
                        inputRef={ref}
                        error={errors.entries && errors.entries[i]?.word ? true : false}
                        helperText={errors.entries && errors.entries[i]?.word ? errors.entries[i]?.word?.message : ""}
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
                        <Select label="Word Type" labelId="word-type-0-label" {...field}>
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
                    render={({ field }) => (
                      <TextField
                        label="Translations"
                        variant="outlined"
                        error={errors.entries && errors.entries[i]?.translations ? true : false}
                        helperText={
                          errors.entries && errors.entries[i]?.translations
                            ? errors.entries[i]?.translations?.message
                            : ""
                        }
                        {...field}
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
                    >
                      <ControlPointIcon fontSize="inherit" />
                    </IconButton>
                  )}
                  {i > 0 && (
                    <IconButton color="error" size="large" onClick={() => remove(i)}>
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
            <Button variant="contained" type="submit" size="medium">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
