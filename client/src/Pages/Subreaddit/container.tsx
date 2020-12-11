import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import { getSubPosts } from "../../APIs";
import { PaginationContainer, PostCard } from "../../Components";
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
  hasMoreToFetch: boolean;
}

type IProps = SelfProps & IClass & ReduxProps;

class Subreaddit extends Component<IProps, IState> {
  limit: number;
  sub: string;

  constructor(props: IProps) {
    super(props);

    this.limit = 15;
    this.sub = this.props.match?.params?.id || "";

    this.state = {
      offset: 0,
      posts: [],
      hasMoreToFetch: true
    };
  }

  componentDidMount() {
    getSubPosts(this.sub, this.state.offset, this.limit).then(
      ({ data, statusCode }) => {
        if (statusCode === STATUS_SUCCESS) {
          this.setState({ posts: data as Array<IPost> }, () => {
            if (data?.length < this.limit) {
              this.setState({ hasMoreToFetch: false });
            }
          });
        }
      }
    );
  }

  fetchMore = () => {
    if (this.state.hasMoreToFetch) {
      getSubPosts(this.sub, this.state.offset + this.limit).then(
        ({ data, statusCode }) => {
          if (statusCode === STATUS_SUCCESS) {
            this.setState(
              (state) => ({
                posts: [...state.posts, ...data],
                offset: state.offset + this.limit
              }),
              () => {
                if (data?.length < this.limit) {
                  this.setState((state) => ({ hasMoreToFetch: false }));
                }
              }
            );
          }
        }
      );
    }
  };

  render() {
    const { posts } = this.state;
    const { classes } = this.props;

    return (
      <PaginationContainer handlePagination={this.fetchMore}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography color={"textPrimary"} className={classes.postsTitle}>
                Posts from {this.sub}
                <Box style={{ marginTop: "1.5rem" }}>
                  {!!posts.length &&
                    posts.map((item, index) => (
                      <PostCard {...item} key={index} />
                    ))}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper></Paper>
            </Grid>
          </Grid>
        </Container>
      </PaginationContainer>
    );
  }
}

export default withStyles(styles)(Subreaddit);
