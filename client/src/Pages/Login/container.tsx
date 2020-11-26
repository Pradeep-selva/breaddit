import {
  Button,
  CircularProgress,
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
    this.toggleLoading();
    let newState = { ...this.state };
    let errors = validate(
      {
        identifier: newState.identifier,
        password: newState.password
      },
      FormSchema
    );

    newState.errors = errors || {};
    newState.loading = !!errors ? newState.loading : !newState.loading;
    this.setState(newState);

    if (!errors) {
      this.setState(() => ({ errors: {} }));
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

      loginUser(payload)
        .then(({ data, statusCode }) => {
          statusCode === 200
            ? this.props.loginUser(data || "")
            : this.setState({
                errors: {
                  ...this.state.errors,
                  general: [data]
                }
              });
        })
        .catch((error) => console.log(error.error))
        .finally(this.toggleLoading);
    }
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

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
                {FormFields.map((field, index) => (
                  <Grid item xs={12}>
                    <TextInput
                      key={index}
                      id={field.key}
                      label={field.label}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      variant={"outlined"}
                      onChange={this.onFieldChange}
                      value={this.state[field.key as keyof State]}
                      className={classes.formField}
                      helperText={this.state.errors[field.key]}
                      error={!!this.state.errors[field.key]}
                      color={"secondary"}
                    />
                  </Grid>
                ))}
              </Grid>
              {this.state.errors["general"] && (
                <Typography
                  variant={"body2"}
                  color={"error"}
                  style={{ marginBottom: "2%" }}
                >
                  {this.state.errors["general"]}
                </Typography>
              )}
              <Button
                variant={"contained"}
                color={"primary"}
                size={"large"}
                disabled={this.state.loading}
                onClick={this.onSubmit}
                style={{
                  marginBottom: "3%",
                  position: "relative"
                }}
              >
                {this.state.loading && (
                  <CircularProgress
                    color={"inherit"}
                    size={30}
                    style={{
                      position: "absolute",
                      marginLeft: "10%"
                    }}
                  />
                )}
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
