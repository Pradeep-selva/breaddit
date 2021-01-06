import React from "react";
import { Avatar as ImageAvatar } from "..";
import { ISubSearchResult, IUserSearchResult } from "../../Types";
import { Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { formatNumberNotation } from "../../Services";
import { useHistory } from "react-router";
import { RouteNames } from "../../Configs";

const SearchResultCard = ({
  UserName,
  Avatar,
  Bio,
  Breads,
  Description,
  Members,
  Name,
  Thumbnail
}: IUserSearchResult & ISubSearchResult) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () =>
    history.push(
      `${!!UserName ? RouteNames.user : RouteNames.sub}/${
        UserName || Name || ""
      }`
    );

  return (
    <Paper className={classes.container} onClick={handleClick}>
      <Grid container spacing={5} alignItems={"center"} justify={"center"}>
        <Grid item xs={1}>
          <ImageAvatar url={Avatar || Thumbnail || ""} size='sm' />
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
          >
            <Typography
              variant={"body2"}
              color={"textPrimary"}
              className={classes.title}
            >
              {`${!!UserName ? "u" : "b"}/${UserName || Name}`}
            </Typography>
            <Typography
              variant={"body2"}
              color={"textPrimary"}
              className={classes.info}
              align={"center"}
            >
              {Description || Bio}
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={2}>
          <Typography
            variant={"body2"}
            color={"textPrimary"}
            className={classes.info}
            align={"center"}
          >
            {`${formatNumberNotation(Breads || Members || 0)} ${
              !!Breads ? "breads" : "bakers"
            }`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchResultCard;
