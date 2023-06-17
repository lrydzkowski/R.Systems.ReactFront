import { Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./new-set.css";

type SetFormInput = {
  name: string | null;
  entries: SetFormEntryInput[];
};

type SetFormEntryInput = {
  word: string;
  translations: string;
};

export default function NewSet() {
  const { handleSubmit, control } = useForm<SetFormInput>();
  const onSubmit: SubmitHandler<SetFormInput> = (data) => console.log(data);

  return (
    <div className="new-set-page--container">
      <Typography variant="subtitle1" component="h2">
        New Set
      </Typography>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <Controller
              name="name"
              defaultValue={""}
              control={control}
              render={({ field }) => <TextField label="Name" {...field} />}
            />
          </div>
          <div className="entry">
            <Controller
              name="entries.0.word"
              defaultValue={""}
              control={control}
              render={({ field }) => <TextField label="Word" {...field} />}
            />
            <Controller
              name="entries.0.translations"
              defaultValue={""}
              control={control}
              render={({ field }) => <TextField label="Translations" {...field} />}
            />
          </div>
          <Button variant="contained" type="submit" size="large">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
