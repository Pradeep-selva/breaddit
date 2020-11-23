import { Container, Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { TrendingPostCard } from "../../Components";
import { IProps } from "./index";
import { styles, IClass } from "./styles";

interface IState {
  offset: number;
}

class Home extends Component<IProps & IClass, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      offset: 0
    };
  }

  componentDidMount() {
    this.props.loadPublicFeed({ offset: this.state.offset, limit: 25 });
  }

  render() {
    const { classes, trendingPosts } = this.props;
    console.log(trendingPosts);
    return (
      <Container className={classes.container}>
        <Typography color={"textPrimary"} className={classes.sectionTitle}>
          Hot Breads
        </Typography>
        <Grid
          container
          justify={"space-between"}
          className={classes.trending}
          spacing={4}
        >
          {!!trendingPosts.length &&
            trendingPosts.map((item, index) => (
              <TrendingPostCard {...item} key={index} />
            ))}
        </Grid>
        <Typography color={"textPrimary"} className={classes.sectionTitle}>
          Breads For You
        </Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
