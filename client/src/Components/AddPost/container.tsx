import React, { Component, FormEvent } from "react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { styles, IClass } from "./styles";
import { FormDefaultValues, FormSchema, tabTypes } from "./schema";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { BsImages } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { getFormPayload, getTruncatedContent, tabProps } from "../../Services";
import Transition from "../Transition";
import TabPanel from "../TabPanel";
import { DARK_GREY, LIGHT_BLACK, SMOKEY_WHITE } from "../../Common/colors";
import BoxedTextField from "../BoxedTextField";
import validate from "validate.js";
import { addPostToSub } from "../../APIs/posts";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import { IProps as ReduxProps } from "./index";
import { BoxedInput } from "../BoxedTextField/styles";
import Dropdown from "../Dropdown";

interface IState {
  values: typeof FormDefaultValues;
  errors: any;
  tabValue: number;
  loading: boolean;
  open: boolean;
  showToast: boolean;
  titleCount: number;
  contentCount: number;
}

type IProps = IClass &
  ReduxProps & {
    sub?: string;
    subPageCallBack?: Function;
    history?: any;
    textButton?: boolean;
  };

class AddPost extends Component<IClass & IProps & { sub?: string }, IState> {
  sub: string | null;
  constructor(props: IClass & IProps) {
    super(props);

    this.sub = this.props.sub || null;

    this.state = {
      values: {
        ...FormDefaultValues
      },
      errors: {},
      loading: false,
      tabValue: 0,
      open: false,
      showToast: false,
      titleCount: 200,
      contentCount: 1000
    };
  }

  componentDidMount() {
    if (!!this.sub) {
      this.setState({
        values: {
          ...this.state.values,
          Sub: this.sub
        }
      });
    }
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState((state) => ({
      tabValue: newValue,
      values: {
        ...FormDefaultValues
      },
      errors: {}
    }));
  };

  handleSubChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState((state) => ({
      values: {
        ...state.values,
        Sub: event.target.value as string
      }
    }));
  };

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
    if (image.size / Math.pow(10, 6) <= 1) {
      this.setState({
        values: {
          ...this.state.values,
          Image: image
        },
        errors: {}
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          Image: ["Image cannot be larger than 8mb"]
        }
      });
    }
  };

  onSubmit = () => {
    this.setState({ loading: true }, () => {
      let newState = { ...this.state };
      let errors = validate(newState.values, FormSchema(newState.tabValue));

      newState.errors = errors || {};
      this.setState(
        (state) => ({ ...newState }),
        () => {
          if (!errors) {
            const { values, tabValue } = this.state;
            const payload = {
              Title: values.Title,
              [`${tabTypes[tabValue]}`]: values[
                tabTypes[tabValue] as keyof typeof values
              ]
            };

            addPostToSub(this.state.values.Sub, getFormPayload(payload))
              .then(({ data, statusCode }) => {
                if (statusCode === STATUS_SUCCESS) {
                  this.setState(
                    {
                      open: false,
                      showToast: true
                    },
                    () => {
                      setTimeout(
                        () => this.setState({ showToast: false }),
                        3000
                      );
                    }
                  );

                  !!this.sub &&
                    !!this.props.subPageCallBack &&
                    this.props.subPageCallBack();

                  this.props.addPostToFeed(data);
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

  renderGeneralErrors = () => (
    <Typography
      variant={"caption"}
      color={"error"}
      style={{ marginTop: "1.5vh" }}
    >
      {this.state.errors.General}
    </Typography>
  );

  renderTitleAndSubFields = () => (
    <React.Fragment>
      <Grid container>
        {!this.sub && (
          <Grid item xs={3}>
            <Dropdown
              label={"Subreaddit"}
              value={this.state.values.Sub}
              onChange={this.handleSubChange}
              input={<BoxedInput fullWidth />}
              backgroundColor={DARK_GREY}
              items={this.props.joinedSubs}
              helperText={this.state.errors.Sub}
            />
          </Grid>
        )}
        <Grid item xs={!!this.sub ? 12 : 9}>
          <BoxedTextField
            fullWidth
            id={"Title"}
            color={"primary"}
            label={"Title"}
            type={"text"}
            placeholder={"Give your post a title"}
            value={this.state.values.Title}
            onChange={(event: any) => {
              this.onFieldChange(event);
              this.setState((state) => ({
                titleCount: 200 - event.target.value.length
              }));
            }}
            helperText={this.state.errors.Title}
            textCount={this.state.titleCount}
            textCountStyle={
              this.state.titleCount >= 0 ? { color: "green" } : { color: "red" }
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  renderTextTab = () => (
    <Container maxWidth={"sm"} className={this.props.classes.inputContainer}>
      {this.renderTitleAndSubFields()}
      <BoxedTextField
        fullWidth
        id={"Content"}
        color={"primary"}
        label={"Content"}
        type={"text"}
        placeholder={"What do you want to say?"}
        rows={10}
        value={this.state.values.Content}
        onChange={(event: any) => {
          this.onFieldChange(event);
          this.setState((state) => ({
            contentCount: 1000 - event.target.value.length
          }));
        }}
        helperText={this.state.errors.Content}
        style={{ marginTop: "1vh" }}
        textCount={this.state.contentCount}
        textCountStyle={
          this.state.contentCount >= 0 ? { color: "green" } : { color: "red" }
        }
      />
      {this.renderGeneralErrors()}
    </Container>
  );

  renderImageTab = () => (
    <Container maxWidth={"sm"} className={this.props.classes.inputContainer}>
      {this.renderTitleAndSubFields()}
      <Box style={{ marginTop: "1vh" }}>
        <Typography
          variant={"caption"}
          className={this.props.classes.imageText}
        >
          Image
        </Typography>
        <Box
          className={this.props.classes.imageContainer}
          onClick={() => document.getElementById("Image")?.click()}
        >
          <BsImages size={50} className={this.props.classes.imageIcon} />
          <Typography variant={"h6"} color={"textPrimary"}>
            {this.state.values.Image.name?.length > 0
              ? getTruncatedContent(
                  this.state.values.Image.name,
                  20,
                  this.state.values.Image.name.split(".").pop()
                )
              : "Add an image"}
          </Typography>
        </Box>
      </Box>
      <Typography variant={"caption"} color={"error"}>
        {this.state.errors.Image}
      </Typography>
      <input
        type={"file"}
        id={"Image"}
        name={"Image"}
        alt={"image"}
        onChange={this.onImageChange}
        style={{ display: "none" }}
      />
      {this.renderGeneralErrors()}
    </Container>
  );

  renderLinkTab = () => (
    <Container
      maxWidth={"sm"}
      className={this.props.classes.linkInputContainer}
    >
      {this.renderTitleAndSubFields()}
      <BoxedTextField
        fullWidth
        id={"Link"}
        color={"primary"}
        label={"Link"}
        type={"text"}
        placeholder={"Add a Link to your post"}
        value={this.state.values.Link}
        onChange={this.onFieldChange}
        helperText={this.state.errors.Link}
        style={{ marginTop: "1vh" }}
      />
      {this.renderGeneralErrors()}
    </Container>
  );

  render() {
    const { loading, open, tabValue, showToast } = this.state;
    const { classes, joinedSubs, textButton = false } = this.props;

    return (
      <React.Fragment>
        {textButton ? (
          <Button variant={"contained"} onClick={this.handleOpen}>
            POST
          </Button>
        ) : (
          <Tooltip title={"Add a post"}>
            <IconButton
              onClick={this.handleOpen}
              color={"inherit"}
              style={{ flex: 1, marginRight: 20 }}
            >
              <AiTwotoneEdit color={SMOKEY_WHITE} />
            </IconButton>
          </Tooltip>
        )}
        <Dialog
          open={open}
          fullScreen
          onClose={this.handleClose}
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
                  onClick={this.handleClose}
                  aria-label='close'
                >
                  <IoMdArrowBack />
                </IconButton>
              )}
              <Typography variant='h6' className={classes.title}>
                Add Post
              </Typography>
              {!!joinedSubs?.length && (
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
              )}
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Container maxWidth={"md"} className={classes.tabContainer}>
              <Paper className={classes.toolbar}>
                {!!joinedSubs?.length ? (
                  <React.Fragment>
                    <Tabs
                      value={tabValue}
                      onChange={this.handleTabChange}
                      indicatorColor='secondary'
                      textColor='inherit'
                      centered
                    >
                      <Tab label='Text' {...tabProps(0)} />
                      <Tab label='Image' {...tabProps(1)} />
                      <Tab label='Link' {...tabProps(2)} />
                    </Tabs>
                    <TabPanel
                      value={tabValue}
                      index={0}
                      style={{ backgroundColor: LIGHT_BLACK }}
                    >
                      {this.renderTextTab()}
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={1}
                      style={{ backgroundColor: LIGHT_BLACK }}
                    >
                      {this.renderImageTab()}
                    </TabPanel>
                    <TabPanel
                      value={tabValue}
                      index={2}
                      style={{ backgroundColor: LIGHT_BLACK }}
                    >
                      {this.renderLinkTab()}
                    </TabPanel>
                  </React.Fragment>
                ) : (
                  <Box className={classes.noSubsContainer}>
                    <Grid container>
                      <Grid item xs={12} sm={3}>
                        <FaThList size={100} />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography variant={"h4"} color={"textPrimary"}>
                          You must join a subreaddit before trying to post
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Container>
          </DialogContent>
        </Dialog>
        <Snackbar autoHideDuration={3000} open={showToast}>
          <Alert
            variant='filled'
            severity='success'
            action={
              <Button
                color='inherit'
                size='small'
                onClick={() =>
                  this.props.history.push(
                    `${RouteNames.sub}/${this.state.values.Sub}`
                  )
                }
              >
                GO TO SUB
              </Button>
            }
          >
            Post successfully added to b/{this.state.values.Sub}!
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddPost);
