import { Container, Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import {
  PaginationContainer,
  PostCard,
  PostSkeleton,
  TrendingPostCard,
  TrendingPostSkeleton
} from "../../Components";
import { IProps } from "./index";
import { styles, IClass } from "./styles";

interface IState {
  offset: number;
  loading: boolean;
}

type Props = IProps & IClass;

class Home extends Component<Props, IState> {
  limit: number;

  constructor(props: Props) {
    super(props);
    this.limit = 15;

    this.state = {
      offset: 0,
      loading: false
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.loadPrivateFeed({
        offset: this.state.offset,
        limit: this.limit
      });
    } else {
      this.props.loadPublicFeed({
        offset: this.state.offset,
        limit: this.limit
      });
    }
  }

  fetchMore = () => {
    this.setState(
      (state) => ({ loading: true }),
      () => {
        if (this.props.hasMoreToFetch) {
          if (this.props.isAuthenticated) {
            this.props.loadPrivateFeed({
              offset: this.state.offset + this.limit,
              limit: this.limit,
              fetchMore: true
            });
          } else {
            this.props.loadPublicFeed({
              offset: this.state.offset + this.limit,
              limit: this.limit,
              fetchMore: true
            });
          }
          this.setState((state) => ({
            offset: state.offset + this.limit,
            loading: false
          }));
        }
      }
    );
  };

  render() {
    const { classes, trendingPosts, feed, loading } = this.props;

    return (
      <PaginationContainer handlePagination={this.fetchMore}>
        <Container className={classes.container} maxWidth={"md"}>
          <Typography color={"textPrimary"} className={classes.sectionTitle}>
            Hot Breads
          </Typography>
          <Grid
            container
            justify={"space-between"}
            className={classes.postsContainer}
            spacing={4}
          >
            {!trendingPosts.length
              ? Array.from({ length: 3 }).map((_, index) => (
                  <TrendingPostSkeleton key={index} />
                ))
              : trendingPosts?.map((item, index) => (
                  <TrendingPostCard {...item} key={index} />
                ))}
          </Grid>
          <Typography color={"textPrimary"} className={classes.sectionTitle}>
            Breads For You
          </Typography>
          <Grid
            container
            direction={"column"}
            className={classes.postsContainer}
          >
            {!feed.length
              ? Array.from({ length: 15 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))
              : feed?.map((item, index) => <PostCard {...item} key={index} />)}
            {loading &&
              Array.from({ length: 3 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
          </Grid>
        </Container>
      </PaginationContainer>
    );
  }
}

export default withStyles(styles)(Home);
