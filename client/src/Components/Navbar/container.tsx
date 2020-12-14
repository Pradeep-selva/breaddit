import React from "react";
import { useStyles } from "./styles";
import Logo from "../../Assets/breaddit.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Grid
} from "@material-ui/core";
import { IProps } from "./index";
import { BiSearchAlt } from "react-icons/bi";
import { BLACK } from "../../Common/colors";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../../Configs";
import AddPost from "../AddPost";
import NavbarUserButton from "../NavbarUserButton";
import NotificationBadge from "../NotificationBadge";

const Navbar = ({ isAuthenticated }: IProps) => {
  const classes = useStyles();

  const renderUnauthenticatedButtons = () => (
    <div className={classes.sectionDesktop}>
      <Button
        variant={"outlined"}
        color={"inherit"}
        style={{ flex: 1, marginRight: 20 }}
        component={NavLink}
        to={RouteNames.login}
      >
        LOGIN
      </Button>
      <Button
        variant={"contained"}
        color={"inherit"}
        style={{ color: BLACK, flex: 1 }}
        component={NavLink}
        to={RouteNames.signup}
      >
        SIGNUP
      </Button>
    </div>
  );

  const renderAuthenticatedButtons = () => (
    <div className={classes.sectionDesktop}>
      <NotificationBadge />
      <AddPost />
      <NavbarUserButton />
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            component={NavLink}
            to={RouteNames.home}
          >
            <img src={Logo} alt={"LOGO"} style={{ width: 45, fontSize: 10 }} />
          </IconButton>
          <Typography className={classes.title} variant='h4' noWrap>
            breaddit
          </Typography>
          <div className={classes.search}>
            <Grid container>
              <Grid item xs={1}>
                <div className={classes.searchIcon}>
                  <BiSearchAlt size={20} />
                </div>
              </Grid>
              <Grid item xs={11}>
                <InputBase
                  fullWidth
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.grow} />
          {isAuthenticated
            ? renderAuthenticatedButtons()
            : renderUnauthenticatedButtons()}
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            ></IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
