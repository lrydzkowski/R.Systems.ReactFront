import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { LearningModes } from "lexica/models/learning-modes";

export interface ChooseModeDialogProps {
  open: boolean;
  onClose: (value: string | null) => void;
}

export default function ChooseModeDialog(props: ChooseModeDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose learning mode</DialogTitle>
      <List sx={{ pt: 0 }}>
        {LearningModes.map((learningMode) => (
          <ListItem button onClick={() => handleListItemClick(learningMode.key)} key={learningMode.key}>
            <ListItemText primary={learningMode.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
