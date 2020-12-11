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
import { FaUserAlt } from "react-icons/fa";
import { DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";
import Avatar from "../Avatar";
import ConfirmDialogWithAlert from "../ConfirmDialogWithAlert";
import { IProps } from "./index";
import { useStyles } from "./styles";

const NavbarUserButton = ({ userData, logoutUser }: IProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    logoutUser();
    setOpenDialog(false);
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FaUserAlt color={SMOKEY_WHITE} />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </MenuItem>
        <MenuItem onClick={() => setOpenDialog(true)}>
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
        title={"Are you sure you want to log out?"}
        contentClassName={classes.contentText}
        content={"Press confirm to log out."}
        handleConfirm={handleConfirm}
        alertText={"Logged out successfully!"}
        cancelText={"Cancel"}
        confirmText={"Confirm"}
      />
    </React.Fragment>
  );
};

export default NavbarUserButton;
