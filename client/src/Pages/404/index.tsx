import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { BiError } from "react-icons/bi";
import { SMOKEY_WHITE } from "../../Common/colors";
import { RouteNames } from "../../Configs";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Box
    {...{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <BiError color={SMOKEY_WHITE} size={"15rem"} />
    <Typography variant={"h1"} color={"textPrimary"}>
      404: Page Not Found
    </Typography>
    <Link to={RouteNames.home}>
      <Button
        variant={"contained"}
        size={"large"}
        style={{ marginTop: "3rem" }}
      >
        go home
      </Button>
    </Link>
  </Box>
);

export default NotFound;
