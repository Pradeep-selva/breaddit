import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { ImUserMinus } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { useHistory } from "react-router";
import { DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";
import { RouteNames } from "../../Configs";
import Avatar from "../Avatar";
import ConfirmDialogWithAlert from "../ConfirmDialogWithAlert";
import { IProps } from "./index";
import { useStyles } from "./styles";
import { deactivateUser } from "../../APIs";

interface IDialogType {
  prompt: string;
  complete: string;
  onComplete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const NavbarUserButton = ({ userData, logoutUser }: IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<IDialogType>({
    complete: "",
    prompt: "",
    onComplete: () => console.log("")
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    logoutUser();
    setOpenDialog(false);
  };

  const handleConfirmDeactivate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deactivateUser()
      .then(() => logoutUser())
      .catch(console.log);
  };

  const onOpenDialog = (type: IDialogType) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const profileClick = () => {
    history.push(`${RouteNames.user}/${userData?.UserName}`);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        startIcon={<Avatar size={"sm"} url={userData?.Avatar || ""} />}
        endIcon={<AiFillCaretDown size={10} />}
        onClick={handleClick}
        className={classes.button}
      >
        {userData?.UserName}
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: DARK_GREY
          }
        }}
        style={{
          marginTop: "2rem"
        }}
      >
        <MenuItem onClick={profileClick}>
          <ListItemIcon>
            <FaUserAlt color={SMOKEY_WHITE} />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </MenuItem>
        <MenuItem
          onClick={() =>
            onOpenDialog({
              complete: "deactivated your account",
              prompt: "deactivate your account",
              onComplete: handleConfirmDeactivate
            })
          }
        >
          <ListItemIcon>
            <ImUserMinus color={SMOKEY_WHITE} />
          </ListItemIcon>
          <ListItemText primary='Deactivate' />
        </MenuItem>
        <MenuItem
          onClick={() =>
            onOpenDialog({
              complete: "logged out",
              prompt: "log out",
              onComplete: handleConfirmLogout
            })
          }
        >
          <ListItemIcon>
            <BiLogOut color={SMOKEY_WHITE} size={20} />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </MenuItem>
      </Menu>
      <ConfirmDialogWithAlert
        openDialog={openDialog}
        handleClose={() => setOpenDialog(false)}
        paperClassName={classes.dialogContainer}
        titleClassName={classes.titleText}
        title={`Are you sure you want to ${dialogType.prompt}?`}
        contentClassName={classes.contentText}
        content={`Press confirm to ${dialogType.prompt}.`}
        handleConfirm={dialogType.onComplete}
        alertText={`${dialogType.complete} successfully!`}
        cancelText={"Cancel"}
        confirmText={"Confirm"}
      />
    </React.Fragment>
  );
};

export default NavbarUserButton;
