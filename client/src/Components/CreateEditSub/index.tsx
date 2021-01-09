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
  MenuItem,
  Paper,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { styles, IClass } from "./styles";
import { FormDefaultValues, FormSchema } from "./schema";
import { IoMdArrowBack } from "react-icons/io";
import { BsImages, BsPlusCircleFill } from "react-icons/bs";
import { getFormPayload, getTruncatedContent } from "../../Services";
import Transition from "../Transition";
import { GREY, SMOKEY_WHITE, WHITE } from "../../Common/colors";
import BoxedTextField from "../BoxedTextField";
import validate from "validate.js";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import { createSub, updateSub } from "../../APIs";
import { Link } from "react-router-dom";

interface IState {
  values: typeof FormDefaultValues;
  errors: any;
  loading: boolean;
  open: boolean;
  showToast: boolean;
  nameCount: number;
  descriptionCount: number;
  tagCount: number;
}

type IProps = IClass & {
  sub?: string;
  history?: any;
  textButton?: boolean;
  menu?: boolean;
  edit?: boolean;
  defaultEditFormValues?: typeof FormDefaultValues;
  openToEdit?: boolean;
  closeEdit?: () => void;
};

class CreateEditSub extends Component<
  IClass & IProps & { sub?: string },
  IState
> {
  constructor(props: IClass & IProps) {
    super(props);

    this.state = {
      values: {
        ...(props.defaultEditFormValues || FormDefaultValues)
      },
      errors: {},
      loading: false,
      open: false,
      showToast: false,
      nameCount: 30,
      descriptionCount: 100,
      tagCount: 10
    };
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

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
          Thumbnail: image
        },
        errors: {}
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          Thumbnail: ["Image cannot be larger than 5mb"]
        }
      });
    }
  };

  onSubmit = () => {
    this.setState({ loading: true }, () => {
      let newState = { ...this.state };
      let errors = validate(newState.values, FormSchema);

      if (newState.tagCount < 0) {
        errors = {
          ...errors,
          Tags: ["You cannot enter more than 10 tags"]
        };
      }

      newState.errors = errors || {};
      this.setState(
        (state) => ({ ...newState }),
        () => {
          if (!errors) {
            let { values } = this.state;
            values.Name = values.Name.split(" ").join("");
            const payload = values;

            for (let k in payload) {
              const key = k as keyof typeof payload;
              if (!payload[key]) {
                delete payload[key];
              }
            }

            console.log(payload);
            (!this.props.edit
              ? createSub(getFormPayload(payload))
              : updateSub(getFormPayload(payload), payload.Name)
            )
              .then(({ data, statusCode }) => {
                if (statusCode === STATUS_SUCCESS) {
                  this.props.edit &&
                    !!this.props.closeEdit &&
                    this.props.closeEdit();

                  this.setState(
                    {
                      open: false,
                      showToast: true
                    },
                    () => {
                      setTimeout(
                        () =>
                          this.setState(
                            { showToast: false },
                            () => this.props.edit && window.location.reload()
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
    const { loading, open, showToast } = this.state;
    const {
      classes,
      closeEdit,
      textButton = false,
      edit = false,
      openToEdit = false,
      menu = false
    } = this.props;

    return (
      <React.Fragment>
        {!edit &&
          (textButton ? (
            <Button variant={"contained"} onClick={this.handleOpen}>
              POST
            </Button>
          ) : menu ? (
            <MenuItem onClick={this.handleOpen}>Create Subreaddit</MenuItem>
          ) : (
            <Tooltip title={"Create a subreaddit"}>
              <IconButton
                onClick={this.handleOpen}
                color={"inherit"}
                style={{ flex: 1, marginRight: 20 }}
              >
                <BsPlusCircleFill color={SMOKEY_WHITE} />
              </IconButton>
            </Tooltip>
          ))}
        <Dialog
          open={openToEdit || open}
          fullScreen
          onClose={closeEdit || this.handleClose}
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
                  onClick={closeEdit || this.handleClose}
                  aria-label='close'
                >
                  <IoMdArrowBack />
                </IconButton>
              )}
              <Typography variant='h6' className={classes.title}>
                {edit ? "Edit" : "Create"} Subreaddit
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
                        <Tooltip title={"Add a thumbnail"}>
                          <IconButton
                            onClick={() =>
                              document.getElementById("Image")?.click()
                            }
                          >
                            <BsImages color={SMOKEY_WHITE} size={40} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      {this.renderErrors(this.state.errors.Thumbnail)}
                      <Typography
                        variant={"caption"}
                        style={{
                          color: fade(WHITE, 0.8),
                          marginBottom: "0.5rem"
                        }}
                      >
                        {this.state.values.Thumbnail?.name?.length > 0 &&
                          getTruncatedContent(
                            this.state.values.Thumbnail.name,
                            10,
                            this.state.values.Thumbnail.name.split(".").pop()
                          )}
                      </Typography>
                    </Grid>

                    <Grid item xs={9}>
                      {!edit && (
                        <BoxedTextField
                          fullWidth
                          id={"Name"}
                          color={"primary"}
                          label={"Subreaddit Name"}
                          type={"text"}
                          placeholder={"Give your sub a name"}
                          value={this.state.values.Name}
                          onChange={(event: any) => {
                            this.onFieldChange(event);
                            this.setState((state) => ({
                              nameCount: 30 - event.target.value.length
                            }));
                          }}
                          helperText={this.state.errors.Name}
                          textCount={this.state.nameCount}
                          textCountStyle={
                            this.state.nameCount >= 0
                              ? { color: "green" }
                              : { color: "red" }
                          }
                        />
                      )}
                    </Grid>
                    <BoxedTextField
                      fullWidth
                      id={"Description"}
                      color={"primary"}
                      label={"Description"}
                      type={"text"}
                      placeholder={"Say something about your subreaddit"}
                      rows={10}
                      value={this.state.values.Description}
                      onChange={(event: any) => {
                        this.onFieldChange(event);
                        this.setState((state) => ({
                          descriptionCount: 100 - event.target.value.length
                        }));
                      }}
                      helperText={this.state.errors.Description}
                      style={{ marginTop: "1vh" }}
                      textCount={this.state.descriptionCount}
                      textCountStyle={
                        this.state.descriptionCount >= 0
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                    <BoxedTextField
                      fullWidth
                      id={"Tags"}
                      color={"primary"}
                      label={"Tags"}
                      type={"text"}
                      placeholder={"Write some tags separated by space"}
                      value={this.state.values.Tags}
                      onChange={(event: any) => {
                        this.onFieldChange(event);
                        this.setState((state) => ({
                          tagCount: 10 - event.target.value.split(" ").length
                        }));
                      }}
                      helperText={this.state.errors.Tags}
                      textCount={this.state.tagCount}
                      textCountStyle={
                        this.state.tagCount >= 0
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
          <Alert
            variant='filled'
            severity='success'
            action={
              <Link to={`${RouteNames.sub}/${this.state.values.Name}`}>
                <Button style={{ color: WHITE }} size='small'>
                  GO TO SUB
                </Button>
              </Link>
            }
          >
            b/{this.state.values.Name} {edit ? "updated" : "created"}!
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CreateEditSub);
