import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import validate from "validate.js";
import { TextInput } from "../../Components";
import { FormDefaultValues, FormFields, FormSchema } from "./schema";
import { RiLoginCircleLine } from "react-icons/ri";
import { IProps } from "./index";
import { IClass, styles } from "./styles";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RouteNames } from "../../Configs";
import { loginUser } from "../../APIs";

type Props = IProps & IClass;

type State = typeof FormDefaultValues & {
  errors: any;
  loading: boolean;
};

class Login extends Component<Props, State> {
  FormSchema: typeof FormSchema;
  constructor(props: Props) {
    super(props);

    this.FormSchema = FormSchema;

    this.state = {
      ...FormDefaultValues,
      errors: {},
      loading: false
    };
  }

  onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });

  onSubmit = () => {
    let newState = { ...this.state };
    let errors = validate(
      {
        identifier: newState.identifier,
        password: newState.password
      },
      FormSchema
    );

    newState.errors = errors || {};

    this.setState(newState);

    if (!errors) {
      const re = /\S+@\S+\.\S+/;
      const payload = re.test(this.state.identifier)
        ? {
            password: this.state.password,
            email: this.state.identifier
          }
        : {
            password: this.state.password,
            userName: this.state.identifier
          };
      console.log(payload);
      loginUser(payload)
        .then(({ data: token }) => {
          !!token && this.props.loginUser(token);
        })
        .catch((error) => console.log(error.error));
    }
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth={"sm"}>
        <Paper className={classes.container}>
          <Grid container>
            <Grid item xs={3} className={classes.loginIllustration}></Grid>
            <Grid item xs={12} md={9} className={classes.loginContainer}>
              <Typography
                variant={"h3"}
                color={"textSecondary"}
                className={classes.title}
              >
                <RiLoginCircleLine style={{ marginRight: "2%" }} />
                Login
              </Typography>
              <Typography
                variant={"body2"}
                color={"textSecondary"}
                className={classes.subTitle}
              >
                By stepping into this world of breads, you are agreeing to our{" "}
                <Link to={RouteNames.home}>Terms & Conditions</Link>
              </Typography>
              <Grid container>
                {FormFields.map((field) => (
                  <Grid item xs={12}>
                    <TextInput
                      id={field.key}
                      label={field.label}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      variant={"outlined"}
                      onChange={this.onFieldChange}
                      value={this.state[field.key as keyof State]}
                      style={{ marginBottom: "4%", width: "75%" }}
                      color={"secondary"}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant={"contained"}
                color={"default"}
                onClick={this.onSubmit}
              >
                LOGIN
              </Button>
              <Typography
                variant={"body2"}
                color={"textSecondary"}
                className={classes.subTitle}
              >
                Dont have an account?{" "}
                <Link to={RouteNames.signup}>Sign up.</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
