import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import { getUserPosts } from "../../APIs";
import { PostCard, PostSkeleton } from "../../Components";
import { STATUS_SUCCESS } from "../../Configs";
import { IPost } from "../../Types";
import { IProps as ReduxProps } from "./index";
import { IClass, styles } from "./styles";

interface SelfProps {
  match: {
    params: {
      [x: string]: string;
    };
  };
}

interface IState {
  offset: number;
  posts: Array<IPost>;
}

type IProps = SelfProps & IClass & ReduxProps;

class Subreaddit extends Component<IProps, IState> {
  limit: number;
  userName: string;

  constructor(props: IProps) {
    super(props);

    this.limit = 15;
    this.userName = this.props.match?.params?.id || "";

    this.state = {
      offset: 0,
      posts: []
    };
  }

  componentDidMount() {
    getUserPosts(this.userName).then(({ data, statusCode }) => {
      if (statusCode === STATUS_SUCCESS) {
        this.setState({ posts: data as Array<IPost> });
      }
    });
  }

  render() {
    const { posts } = this.state;
    const { classes } = this.props;

    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography color={"textPrimary"} className={classes.postsTitle}>
              Posts from {this.userName}
              <Box style={{ marginTop: "1.5rem" }}>
                {!!posts.length
                  ? posts.map((item, index) => (
                      <PostCard {...item} key={index} />
                    ))
                  : Array.from({ length: 10 }).map((_, index) => (
                      <PostSkeleton key={index} />
                    ))}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper></Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Subreaddit);
