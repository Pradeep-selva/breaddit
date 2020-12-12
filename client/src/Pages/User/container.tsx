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
import { DEFAULT_TITLE, STATUS_SUCCESS } from "../../Configs";
import { getTabTitle } from "../../Services";
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
  hasFetched: boolean;
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
      posts: [],
      hasFetched: false
    };
  }

  componentDidMount() {
    document.title = getTabTitle(`u/${this.userName}`);
    getUserPosts(this.userName).then(({ data, statusCode }) => {
      if (statusCode === STATUS_SUCCESS) {
        this.setState({
          posts: data as Array<IPost>,
          hasFetched: true
        });
      }
    });
  }

  componentWillUnmount() {
    document.title = DEFAULT_TITLE;
  }

  render() {
    const { posts, hasFetched } = this.state;
    const { classes } = this.props;

    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography color={"textPrimary"} className={classes.postsTitle}>
              Posts from {this.userName}
            </Typography>
            <Box style={{ marginTop: "1.5rem" }}>
              {!!posts.length ? (
                posts.map((item, index) => <PostCard {...item} key={index} />)
              ) : !hasFetched ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))
              ) : (
                <Typography variant={"h6"} color={"textPrimary"}>
                  u/{this.userName} has not posted anything yet.
                </Typography>
              )}
            </Box>
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
