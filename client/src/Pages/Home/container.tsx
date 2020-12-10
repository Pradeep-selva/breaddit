import { Container, Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import {
  PostCard,
  PostSkeleton,
  TrendingPostCard,
  TrendingPostSkeleton
} from "../../Components";
import { IProps } from "./index";
import { styles, IClass } from "./styles";

interface IState {
  offset: number;
}

type Props = IProps & IClass;

class Home extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      offset: 0
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.loadPrivateFeed({ offset: this.state.offset, limit: 25 });
    } else {
      this.props.loadPublicFeed({ offset: this.state.offset, limit: 25 });
    }
  }

  render() {
    const {
      classes,
      trendingPosts,
      feed,
      joinedSubs = [],
      isAuthenticated
    } = this.props;

    return (
      <Container className={classes.container}>
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
        <Grid container direction={"column"} className={classes.postsContainer}>
          {!!joinedSubs.length || !isAuthenticated ? (
            !feed.length ? (
              Array.from({ length: 15 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            ) : (
              feed?.map((item, index) => <PostCard {...item} key={index} />)
            )
          ) : (
            <Typography variant={"h6"} color={"textPrimary"}>
              Nothing to show
            </Typography>
          )}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
