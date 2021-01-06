import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useStyles } from "../SearchResultCard/styles";

const SearchResultCard = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Grid container spacing={5} alignItems={"center"} justify={"center"}>
        <Grid item xs={1}>
          <Skeleton
            variant={"circle"}
            width={50}
            height={50}
            animation={"wave"}
          />
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
          >
            <Skeleton width={"40%"} animation={"wave"} />
            <Skeleton width={"90%"} animation={"wave"} />
          </Grid>
        </Grid>
        <Grid xs={2}>
          <Skeleton width={"70%"} animation={"wave"} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchResultCard;
