import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { IPost } from "../../Types";
import { useStyles } from "./styles";

const TrendingPostCard = ({
  Title,
  Content,
  Image,
  User,
  Upvotes,
  Downvotes,
  CreatedAt,
  Sub
}: IPost) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4}>
      <Paper
        className={classes.container}
        style={{ background: `url(${Image})`, backgroundSize: "cover" }}
      >
        <Box className={classes.content}>
          <Container>
            <Typography
              className={classes.title}
              color={"textPrimary"}
              align={"center"}
            >
              {Title}
            </Typography>
            <Typography
              variant={"body1"}
              color={"textPrimary"}
              align={"center"}
            >
              {Content.length < 80 ? Content : `${Content.slice(0, 80)}...more`}
            </Typography>
          </Container>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TrendingPostCard;
