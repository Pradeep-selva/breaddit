import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { IPost } from "../../Types";
import { useStyles } from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avatar from "../Avatar";

const PostCard = ({ Title, CreatedAt, Sub, User }: IPost) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <Grid item>
      <Paper className={classes.container}>
        <Box className={classes.upvoteSection}></Box>
        <Box className={classes.contentSection}>
          <Box className={classes.titleSection}>
            <Typography
              className={classes.subName}
              color={"textPrimary"}
              component={Link}
              to={"/"}
            >
              b/{Sub}
            </Typography>
            <Typography className={classes.postedText}>posted by</Typography>
            <Avatar
              url={User.Avatar}
              size={"xs"}
              style={{ margin: "0 0.3rem" }}
            />
            <Typography
              className={classes.userNameText}
              component={Link}
              to={"/"}
            >
              u/{User.UserName}
            </Typography>
            <Typography className={classes.postedText}>
              {dayjs(CreatedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PostCard;
