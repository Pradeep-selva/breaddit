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

interface IProps {
  openDialog: boolean;
  paperClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  handleClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleConfirm: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  title: string;
  content: string;
  cancelText: string;
  confirmText: string;
  alertText: string;
}

const ConfirmDialogWithAlert = ({
  openDialog,
  paperClassName,
  titleClassName,
  contentClassName,
  title,
  content,
  cancelText,
  confirmText,
  alertText,
  handleClose,
  handleConfirm
}: IProps) => {
  const [showToast, setShowToast] = React.useState(false);

  const onConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleConfirm(event);
    setShowToast((prev) => true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          className: paperClassName || ""
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' className={titleClassName || ""}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            className={contentClassName || ""}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"inherit"}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} color={"inherit"} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar autoHideDuration={3000} open={showToast}>
        <Alert variant='filled' severity='success'>
          {alertText}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default ConfirmDialogWithAlert;
