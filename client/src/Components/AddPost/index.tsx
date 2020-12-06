import React, { Component, FormEvent } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import { styles, IClass } from "./styles";
import { FormDefaultValues, FormSchema, tabTypes } from "./schema";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { BsImages } from "react-icons/bs";
import { tabProps } from "../../Services";
import Transition from "../Transition";
import TabPanel from "../TabPanel";
import { LIGHT_BLACK } from "../../Common/colors";
import BoxedTextField from "../BoxedTextField";
import validate from "validate.js";
import { addPostToSub } from "../../APIs/posts";

interface IState {
  values: typeof FormDefaultValues;
  errors: any;
  tabValue: number;
  loading: boolean;
  open: boolean;
}

class AddPost extends Component<IClass, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      values: {
        ...FormDefaultValues
      },
      errors: {},
      loading: false,
      tabValue: 0,
      open: false
    };
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState((state) => ({
      tabValue: newValue
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
    if (image.size / Math.pow(10, 6) <= 8) {
      this.setState({
        values: {
          ...this.state.values,
          Image: image
        }
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
    this.toggleLoading();

    let newState = { ...this.state };
    let errors = validate(newState.values, FormSchema(newState.tabValue));

    newState.errors = errors || {};
    this.setState(newState);

    if (!errors) {
      const { values, tabValue } = this.state;
      const payloadObj = {
        Title: values.Title,
        [`${tabTypes[tabValue]}`]: values[
          tabTypes[tabValue] as keyof typeof values
        ]
      };
      const payload = new FormData();

      for (var key in payloadObj) payload.set(key, payloadObj[key]);

      addPostToSub(this.state.values.Sub, payload)
        .then(console.log)
        .catch(console.log)
        .finally(() => this.toggleLoading());
    }
  };

  renderTitleAndSubFields = () => (
    <React.Fragment>
      <BoxedTextField
        fullWidth
        id={"Sub"}
        color={"primary"}
        label={"Sub"}
        type={"text"}
        placeholder={"Which sub do you want to post to?"}
        value={this.state.values.Sub}
        onChange={this.onFieldChange}
      />
      <BoxedTextField
        fullWidth
        id={"Title"}
        color={"primary"}
        label={"Title"}
        type={"text"}
        placeholder={"Give your post a title"}
        value={this.state.values.Title}
        onChange={this.onFieldChange}
        style={{ marginTop: "1vh" }}
      />
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
        onChange={this.onFieldChange}
        style={{ marginTop: "1vh" }}
      />
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
            {!!this.state.values.Image
              ? this.state.values.Image.name
              : "Add an image"}
          </Typography>
        </Box>
      </Box>
      <input
        type={"file"}
        id={"Image"}
        name={"Image"}
        alt={"image"}
        onChange={this.onImageChange}
        style={{ display: "none" }}
      />
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
        style={{ marginTop: "1vh" }}
      />
    </Container>
  );

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  render() {
    const { loading, open, tabValue } = this.state;
    const { classes } = this.props;

    console.log(this.state.errors);

    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleOpen}
          color={"inherit"}
          style={{ flex: 1, marginRight: 20 }}
        >
          <AiTwotoneEdit />
        </IconButton>
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
              <IconButton
                edge='start'
                color='inherit'
                onClick={this.handleClose}
                aria-label='close'
              >
                <IoMdArrowBack />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Add Post
              </Typography>
              <Button
                autoFocus
                color='inherit'
                variant={"outlined"}
                onClick={this.onSubmit}
              >
                submit
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Container maxWidth={"md"} className={classes.tabContainer}>
              <Paper className={classes.toolbar}>
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
              </Paper>
            </Container>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddPost);
