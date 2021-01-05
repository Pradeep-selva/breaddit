import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import { IDetailedComment } from "../../Types";
import { useStyles } from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import { RouteNames } from "../../Configs";

const CommentCard = ({ Body, CreatedAt, CreatedBy }: IDetailedComment) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <Paper className={classes.container}>
      <Box className={classes.headerContainer}>
        <Link to={`${RouteNames.user}/${CreatedBy}`} style={{ flex: 1 }}>
          <Typography
            variant={"body1"}
            color={"textPrimary"}
            className={classes.name}
          >
            u/{CreatedBy}
          </Typography>
        </Link>
        <Typography variant={"caption"}>
          {dayjs(CreatedAt.seconds * 1000).fromNow()}
        </Typography>
      </Box>
      <Box className={classes.bodyContainer}>
        <Typography>{Body}</Typography>
      </Box>
    </Paper>
  );
};

export default CommentCard;
