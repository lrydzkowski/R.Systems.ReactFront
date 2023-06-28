import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import "./dialog-error.css";

interface IDialogErrorProps {
  isErrorOpen: boolean;
  errorMsg: string;
  setIsErrorOpen: (state: boolean) => void;
}

export default function DialogError(props: IDialogErrorProps) {
  return (
    <Dialog open={props.isErrorOpen}>
      <DialogTitle className="dialog-error--title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText className="dialog-error--description">{props.errorMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setIsErrorOpen(false)} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
