import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  withWidth
} from "@material-ui/core";
import React from "react";
import Avatar from "../Avatar";
import { MdTrendingUp } from "react-icons/md";
import { formatNumberNotation, getTruncatedContent } from "../../Services";
import { IPost } from "../../Types";
import { useStyles } from "./styles";

const TrendingPostCard = ({
  Title,
  Content,
  Image,
  User,
  Upvotes,
  Downvotes,
  width,
  onClick = () => alert("clicked post")
}: IPost & {
  width: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const classes = useStyles();
  const algebraicTotal = formatNumberNotation(Upvotes - Downvotes);
  const truncateLength = width === "xs" ? 40 : 80;
  return (
    <Grid item xs={12} sm={4}>
      <Paper
        onClick={onClick}
        className={classes.container}
        style={{ background: `url(${Image})`, backgroundSize: "cover" }}
      >
        <Box className={classes.content} display={"flex"}>
          <Container style={{ flex: 4 }}>
            <Typography
              className={classes.title}
              color={"textPrimary"}
              align={"center"}
            >
              {getTruncatedContent(Title, 30)}
            </Typography>
            <Typography
              variant={"body1"}
              color={"textPrimary"}
              align={"center"}
            >
              {getTruncatedContent(Content, truncateLength, "more")}
            </Typography>
          </Container>
          <Container style={{ flex: 1 }}>
            <Grid container>
              <Grid item xs={2} sm={1}>
                <MdTrendingUp />
              </Grid>
              <Grid item xs={5}>
                {algebraicTotal}
              </Grid>
              <Grid item xs={2}>
                <Avatar size={"xs"} url={User.Avatar} />
              </Grid>
              <Grid item xs={3}>
                <Box className={classes.name}>u/{User.UserName}</Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Paper>
    </Grid>
  );
};

export default withWidth({ initialWidth: "lg" })(TrendingPostCard);
