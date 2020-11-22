import { Container, Paper, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { IProps } from "./index";
import { styles, classesType } from "./styles";

interface IState {
  offset: number;
}

class Home extends Component<IProps & classesType, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      offset: 0
    };
  }

  componentDidMount() {
    this.props.loadPublicFeed({ offset: 0, limit: 25 });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth={"sm"} className={classes.container}>
        <Typography
          variant={"h6"}
          color={"textPrimary"}
          className={classes.sectionTitle}
        >
          Hot Breads
        </Typography>
      </Container>
    );
  }
}

export default withStyles(styles)(Home);
