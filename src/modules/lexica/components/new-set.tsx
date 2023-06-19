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
import { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
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

  useEffect(() => {
    nameFieldRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<SetFormInput> = (data) => console.log(data);

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
