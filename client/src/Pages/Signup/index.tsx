import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import validate from "validate.js";
import { TextInput } from "../../Components";
import { FormDefaultValues, FormFields, FormSchema } from "./schema";
import { TiUserAdd } from "react-icons/ti";
import { IClass, styles } from "./styles";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import { signUpUser } from "../../APIs";

type State = {
  values: typeof FormDefaultValues;
  errors: any;
  loading: boolean;
  open: boolean;
};

class Signup extends Component<IClass, State> {
  FormSchema: typeof FormSchema;
  constructor(props: IClass) {
    super(props);

    this.FormSchema = FormSchema;

    this.state = {
      values: { ...FormDefaultValues },
      errors: {},
      open: false,
      loading: false
    };
  }

  onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      values: {
        ...this.state.values,
        [event.target.id]: event.target.value
      }
    });

  onSubmit = () => {
    this.toggleLoading();
    let newState = { ...this.state };
    var errors = validate(this.state.values, FormSchema);

    newState.errors = errors || {};
    newState.loading = !!errors ? newState.loading : !newState.loading;
    this.setState(newState);

    if (!errors) {
      this.setState(() => ({ errors: {} }));
      const payload = this.state.values;

      delete payload.confirmPassword;

      signUpUser(payload)
        .then(({ statusCode, data }) => {
          statusCode === STATUS_SUCCESS
            ? this.setState({ open: true })
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

  handleClose = () => this.setState({ open: false });

  renderDialogue = () => (
    <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle
        id='alert-dialog-title'
        className={this.props.classes.dialogueTitle}
      >
        SignUp Successful!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Welcome to breaddit and have a great time with breads.{"\n"} Proceed
          to Login or go back to Home
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary'>
          <Link to={RouteNames.home}>Go Home</Link>
        </Button>
        <Button color='primary' autoFocus>
          <Link to={RouteNames.login}>Login</Link>
        </Button>
      </DialogActions>
    </Dialog>
  );

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth={"sm"}>
        {this.renderDialogue()}
        <Paper className={classes.container}>
          <Grid container>
            <Grid item xs={3} className={classes.loginIllustration}></Grid>
            <Grid item xs={12} md={9} className={classes.loginContainer}>
              <Typography
                variant={"h3"}
                color={"textSecondary"}
                className={classes.title}
              >
                <TiUserAdd style={{ marginRight: "2%" }} />
                SignUp
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
                SIGNUP
              </Button>
              <Typography
                variant={"body2"}
                color={"textSecondary"}
                className={classes.subTitle}
              >
                Dont have an account? <Link to={RouteNames.login}>LOGIN.</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(Signup);
