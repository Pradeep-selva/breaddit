import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { RiMenu4Line } from "react-icons/ri";
import { useHistory } from "react-router";
import { IProps } from ".";
import {
  AddPost,
  CreateEditSub,
  NavbarUserButton,
  NotificationBadge
} from "..";
import { DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";
import { RouteNames } from "../../Configs";
import { useStyles } from "./styles";

const NavMobileMenu = ({ isAuthenticated }: IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogin = () => {
    history.push(RouteNames.login);
    handleClose();
  };

  const handleSignup = () => {
    history.push(RouteNames.signup);
    handleClose();
  };

  return (
    <React.Fragment>
      <Box component={"div"} className={classes.sectionMobile}>
        {isAuthenticated && <NotificationBadge />}
        {isAuthenticated && <NavbarUserButton mobile />}
        <IconButton color='inherit' onClick={handleOpen}>
          <RiMenu4Line color={SMOKEY_WHITE} />
        </IconButton>
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
        >
          {isAuthenticated ? (
            <React.Fragment>
              <CreateEditSub menu />
              <AddPost menu />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MenuItem onClick={handleLogin}>Log in</MenuItem>
              <MenuItem onClick={handleSignup}>Sign up</MenuItem>
            </React.Fragment>
          )}
        </Menu>
      </Box>
    </React.Fragment>
  );
};

export default NavMobileMenu;
