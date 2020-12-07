import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useStyles } from "./styles";

interface IProps {
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className: string;
}

const DeletePostButton = ({ onDelete, className }: IProps) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const handleOpen = () => setOpenDialog(true);

  const handleClose = () => setOpenDialog(false);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onDelete(event);
    setOpenDialog(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <React.Fragment>
      <Button
        size={"small"}
        variant={"outlined"}
        color={"inherit"}
        onClick={handleOpen}
        className={className}
      >
        Delete
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          className: classes.dialogContainer
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' className={classes.titleText}>
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            className={classes.contentText}
          >
            Press confirm to delete post. This action is irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"inherit"}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color={"inherit"} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar autoHideDuration={3000} open={showToast}>
        <Alert variant='filled' severity='success'>
          Post successfully deleted!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default DeletePostButton;
