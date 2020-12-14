import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import CircleAvatar from "../Avatar";

interface IProps {
  avatar: string;
  name: string;
  subLines: Array<string>;
  description: string;
  renderBottom: Function;
}

const DetailCard = ({
  avatar,
  name,
  subLines,
  description,
  renderBottom
}: IProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.userDetailContainer}>
      <CircleAvatar size={"xl"} url={avatar} className={classes.avatar} />
      <Typography className={classes.name}>{name}</Typography>
      {subLines.map((line) => (
        <Typography className={classes.subTexts}>{line}</Typography>
      ))}
      <Typography className={classes.description}>" {description} "</Typography>
      <Box style={{ paddingTop: "1.5rem" }}>{renderBottom()}</Box>
    </Paper>
  );
};

export default DetailCard;
