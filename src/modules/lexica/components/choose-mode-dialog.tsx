import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from "@mui/material";
import useLearningModes from "@lexica/hooks/use-learning-modes";

export interface ChooseModeDialogProps {
  open: boolean;
  onClose: (value: string | null) => void;
}

export default function ChooseModeDialog(props: ChooseModeDialogProps) {
  const { onClose, open } = props;
  const { learningModes } = useLearningModes();

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
        {learningModes.map((learningMode) => (
          <ListItemButton onClick={() => handleListItemClick(learningMode.key)} key={learningMode.key}>
            <ListItemText primary={learningMode.name} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}
