import { Box, Grid, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useStyles } from "../PostCard/styles";

interface IProps {
  height?: string | number;
}

const PostSkeleton = ({ height }: IProps) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Paper className={classes.container} style={!!height ? { height } : {}}>
        <Box className={classes.upvoteSection}>
          <Skeleton
            variant={"circle"}
            width={30}
            height={30}
            style={{ marginTop: "1rem" }}
          />
          <Skeleton
            variant={"circle"}
            width={10}
            height={10}
            animation={"wave"}
          />
          <Skeleton
            variant={"circle"}
            width={30}
            height={30}
            animation={"wave"}
          />
        </Box>
        <Box className={classes.contentSection}>
          <Box className={classes.titleSection} style={{ flex: 1 }}>
            <Skeleton width={"75%"} animation={"wave"} />
          </Box>
          <Box className={classes.flexContainer} style={{ flex: 5 }}>
            <Box
              className={classes.textDetailsContainer}
              style={{ marginTop: "1%" }}
            >
              <Skeleton width={"90%"} animation={"wave"} />
              <Skeleton width={"80%"} animation={"wave"} />
              <Skeleton width={"85%"} animation={"wave"} />
            </Box>
          </Box>
          <Box style={{ flex: 0.7 }} className={classes.bottomBarContainer}>
            <Box style={{ flex: 1 }} className={classes.bottomBarElement}>
              <Skeleton
                variant={"circle"}
                width={30}
                height={30}
                animation={"wave"}
              />
            </Box>
            <Box style={{ flex: 6 }} className={classes.bottomBarElement}>
              <Skeleton
                variant={"circle"}
                width={30}
                height={30}
                animation={"wave"}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PostSkeleton;
