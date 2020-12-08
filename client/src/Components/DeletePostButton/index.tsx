import { Button } from "@material-ui/core";
import React from "react";
import ConfirmDialogWithAlert from "../ConfirmDialogWithAlert";
import { useStyles } from "./styles";

interface IProps {
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className: string;
}

const DeletePostButton = ({ onDelete, className }: IProps) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpen = () => setOpenDialog(true);

  const handleClose = () => setOpenDialog(false);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onDelete(event);
    setOpenDialog(false);
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
      <ConfirmDialogWithAlert
        openDialog={openDialog}
        handleClose={handleClose}
        paperClassName={classes.dialogContainer}
        titleClassName={classes.titleText}
        title={"Are you sure you want to delete this post?"}
        contentClassName={classes.contentText}
        content={"Press confirm to delete post. This action is irreversible"}
        handleConfirm={handleDelete}
        alertText={"Post successfully deleted!"}
        cancelText={"Cancel"}
        confirmText={"Confirm"}
      />
    </React.Fragment>
  );
};

export default DeletePostButton;
