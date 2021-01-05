import { Box, Container, fade, Grid, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { BLACK } from "../../Common/colors";
import { useStyles } from "../TrendingPostCard/styles";

const TrendingPostSkeleton = () => {
  const classes = useStyles();

  return (
    <Grid xs={12} sm={4}>
      <Paper
        className={classes.container}
        style={{ backgroundColor: fade(BLACK, 0.9), marginLeft: "1.5rem" }}
      >
        <Box className={classes.content} display={"flex"}>
          <Container style={{ flex: 4 }}>
            <Skeleton width={"100%"} animation={"wave"} />
            <Skeleton width={"80%"} animation={"wave"} />
            <Skeleton width={"90%"} animation={"wave"} />
          </Container>
          <Container style={{ flex: 1 }}>
            <Grid container>
              <Grid item xs={2} sm={1}>
                <Skeleton
                  variant={"circle"}
                  width={"100%"}
                  height={"100%"}
                  animation={"wave"}
                />
              </Grid>
              <Grid item xs={7}>
                <Skeleton
                  width={"80%"}
                  style={{ marginLeft: "20%" }}
                  animation={"wave"}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TrendingPostSkeleton;
