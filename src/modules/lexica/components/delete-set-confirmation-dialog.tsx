import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import "./delete-set-confirmation-dialog.css";

export interface IDeleteSetConfirmationDialogProps {
  isOpen: boolean;
  onClose: (agreed: boolean) => void;
}

export default function DeleteSetConfirmationDialog(props: IDeleteSetConfirmationDialogProps) {
  return (
    <div>
      <Dialog open={props.isOpen} onClose={() => props.onClose(false)}>
        <DialogContent>
          <DialogContentText id="delete-set-confirmation-dialog--description">
            Are you sure that you want to delete selected sets?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose(true)} sx={{ color: "green" }}>
            Yes
          </Button>
          <Button onClick={() => props.onClose(false)} sx={{ color: "red" }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
