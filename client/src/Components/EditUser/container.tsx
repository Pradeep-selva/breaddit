import React, { Component, FormEvent } from "react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  fade,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { styles, IClass } from "./styles";
import { FormValuesType, FormSchema } from "./schema";
import { IoMdArrowBack } from "react-icons/io";
import { BsImages } from "react-icons/bs";
import { getFormPayload, getTruncatedContent } from "../../Services";
import Transition from "../Transition";
import { GREY, SMOKEY_WHITE, WHITE } from "../../Common/colors";
import BoxedTextField from "../BoxedTextField";
import validate from "validate.js";
import { IProps as ReduxProps } from ".";
import { STATUS_SUCCESS } from "../../Configs";
import { updateUserData } from "../../APIs";

interface IState {
  values: FormValuesType;
  errors: any;
  loading: boolean;
  showToast: boolean;
  bioCount: number;
  locationCount: number;
  statusCount: number;
}

type IProps = IClass &
  ReduxProps & {
    history?: any;
    openToEdit: boolean;
    closeEdit: () => void;
  };

class EditUser extends Component<IProps & { sub?: string }, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      values: {
        Bio: props.user?.Bio || "",
        Location: props.user?.Location || "",
        Status: props.user?.Status || "",
        Avatar: (null as unknown) as File
      },
      errors: {},
      loading: false,
      showToast: false,
      bioCount: 120,
      locationCount: 30,
      statusCount: 75
    };
  }
  onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement> &
      FormEvent<HTMLDivElement> &
      FormEvent<HTMLLabelElement>
  ) =>
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [event.target.id]: event.target.value
      }
    });

  onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target && event.target.files![0];
    if ((image?.size || 0) / Math.pow(10, 6) <= 5) {
      this.setState({
        values: {
          ...this.state.values,
          Avatar: image
        },
        errors: {}
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          Avatar: ["Image cannot be larger than 5mb"]
        }
      });
    }
  };

  onSubmit = () => {
    this.setState({ loading: true }, () => {
      let newState = { ...this.state };
      let errors = validate(newState.values, FormSchema);

      newState.errors = errors || {};
      this.setState(
        (state) => ({ ...newState }),
        () => {
          if (!errors) {
            let { values } = this.state;
            const payload = values;

            for (let k in payload) {
              const key = k as keyof typeof payload;
              if (!payload[key]) {
                delete payload[key];
              }
            }

            updateUserData(getFormPayload(payload))
              .then(({ data, statusCode }) => {
                if (statusCode === STATUS_SUCCESS) {
                  this.props.closeEdit();

                  this.setState(
                    {
                      showToast: true
                    },
                    () => {
                      setTimeout(
                        () =>
                          this.setState({ showToast: false }, () =>
                            window.location.reload()
                          ),
                        3000
                      );
                    }
                  );
                } else {
                  this.setState({
                    errors: {
                      ...this.state.errors,
                      General: [data]
                    }
                  });
                }
              })
              .catch(console.log)
              .finally(() => this.setState({ loading: false }));
          } else {
            this.setState({ loading: false });
          }
        }
      );
    });
  };

  renderErrors = (error: string) => (
    <Typography
      variant={"caption"}
      color={"error"}
      style={{ marginTop: "1.5vh" }}
    >
      {error}
    </Typography>
  );

  render() {
    const { loading, showToast } = this.state;
    const { classes, closeEdit, openToEdit = false } = this.props;

    return (
      <React.Fragment>
        <Dialog
          open={openToEdit}
          fullScreen
          onClose={closeEdit}
          PaperProps={{
            className: classes.dialogContainer
          }}
          aria-labelledby='form-dialog-title'
          TransitionComponent={Transition}
        >
          <AppBar style={{ position: "relative" }} className={classes.toolbar}>
            <Toolbar>
              {!loading && (
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={closeEdit}
                  aria-label='close'
                >
                  <IoMdArrowBack />
                </IconButton>
              )}
              <Typography variant='h6' className={classes.title}>
                Update your info
              </Typography>

              <Button
                autoFocus
                color='inherit'
                variant={"outlined"}
                onClick={this.onSubmit}
                disabled={loading}
              >
                {loading && (
                  <CircularProgress
                    color={"secondary"}
                    size={30}
                    style={{
                      position: "absolute",
                      marginLeft: "10%"
                    }}
                  />
                )}
                submit
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Container maxWidth={"md"} className={classes.tabContainer}>
              <Paper
                className={classes.toolbar}
                style={{ padding: "2rem 0 2rem 0" }}
              >
                <Container maxWidth={"sm"}>
                  <Grid container spacing={1} justify={"space-between"}>
                    <Grid
                      item
                      xs={2}
                      alignItems={"center"}
                      justify={"center"}
                      direction={"column"}
                    >
                      <Box
                        {...{
                          display: "flex",
                          borderRadius: "50%",
                          border: `1px solid ${GREY}`,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Tooltip title={"Update avatar"}>
                          <IconButton
                            onClick={() =>
                              document.getElementById("Image")?.click()
                            }
                          >
                            <BsImages color={SMOKEY_WHITE} size={40} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      {this.renderErrors(this.state.errors.Avatar)}
                      <Typography
                        variant={"caption"}
                        style={{
                          color: fade(WHITE, 0.8),
                          marginBottom: "0.5rem"
                        }}
                      >
                        {this.state.values.Avatar?.name?.length > 0 &&
                          getTruncatedContent(
                            this.state.values.Avatar.name,
                            10,
                            this.state.values.Avatar.name.split(".").pop()
                          )}
                      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      <BoxedTextField
                        fullWidth
                        id={"Status"}
                        color={"primary"}
                        label={"Status"}
                        type={"text"}
                        placeholder={"Let us in on your life"}
                        value={this.state.values.Status}
                        onChange={(event: any) => {
                          this.onFieldChange(event);
                          this.setState((state) => ({
                            statusCount: 75 - event.target.value.length
                          }));
                        }}
                        helperText={this.state.errors.Status}
                        textCount={this.state.statusCount}
                        textCountStyle={
                          this.state.statusCount >= 0
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      />
                    </Grid>
                    <BoxedTextField
                      fullWidth
                      id={"Bio"}
                      color={"primary"}
                      label={"Bio"}
                      type={"text"}
                      placeholder={"Whats on your mind?"}
                      rows={10}
                      value={this.state.values.Bio}
                      onChange={(event: any) => {
                        this.onFieldChange(event);
                        this.setState((state) => ({
                          bioCount: 120 - event.target.value.length
                        }));
                      }}
                      helperText={this.state.errors.Bio}
                      style={{ marginTop: "1vh" }}
                      textCount={this.state.bioCount}
                      textCountStyle={
                        this.state.bioCount >= 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                    <BoxedTextField
                      fullWidth
                      id={"Location"}
                      color={"primary"}
                      label={"Location"}
                      type={"text"}
                      placeholder={"Where do you live?"}
                      value={this.state.values.Location}
                      onChange={(event: any) => {
                        this.onFieldChange(event);
                        this.setState((state) => ({
                          locationCount: 30 - event.target.value.length
                        }));
                      }}
                      helperText={this.state.errors.Location}
                      textCount={this.state.locationCount}
                      textCountStyle={
                        this.state.locationCount >= 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                    {this.renderErrors(this.state.errors.General)}
                  </Grid>
                  <input
                    type={"file"}
                    id={"Image"}
                    name={"Image"}
                    alt={"image"}
                    onChange={this.onImageChange}
                    style={{ display: "none" }}
                  />
                </Container>
              </Paper>
            </Container>
          </DialogContent>
        </Dialog>
        <Snackbar autoHideDuration={3000} open={showToast}>
          <Alert variant='filled' severity='success'>
            Your details have been updated!
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EditUser);
