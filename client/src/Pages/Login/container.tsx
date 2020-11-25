import { Container, withStyles } from "@material-ui/core";
import { IProps } from "./index";
import { IClass, styles } from "./styles";
import React, { Component } from "react";

type Props = IProps & IClass;

class Login extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      identifier: "",
      password: "",
      isValid: ""
    };
  }

  render() {
    const { classes } = this.props;
    return <Container className={classes.container}>abc</Container>;
  }
}

export default withStyles(styles)(Login);
