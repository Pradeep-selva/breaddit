import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import { styles, IClass } from "./styles";
import { FormDefaultValues, FormFields, FormSchema } from "./schema";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import Transition from "../Transition";

interface IState {
  values: typeof FormDefaultValues;
  errors: any;
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
      open: false
    };
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { errors, loading, open, values } = this.state;
    const { classes } = this.props;
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
          <AppBar style={{ position: "relative" }}>
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
              <Button autoFocus color='inherit' onClick={this.handleClose}>
                submit
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleClose} color='primary'>
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddPost);
