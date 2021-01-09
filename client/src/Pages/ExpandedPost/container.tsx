import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  withStyles,
  Link as MuiLink,
  IconButton,
  Grid,
  Hidden
} from "@material-ui/core";
import { deletePostById, getPostById } from "../../APIs";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import {
  Avatar,
  CommentBox,
  CommentCard,
  DeletePostButton,
  PostSkeleton,
  VotesSection
} from "../../Components";
import { IExpandedPost } from "../../Types";
import { styles, IClass } from "./styles";
import { IProps as IReduxProps } from "./index";
import dayjs from "dayjs";
import { GoLink } from "react-icons/go";
import { BLUE, LIGHT_BLUE, SEMI_GREY, WHITE } from "../../Common/colors";
import { FaLink, FaPlus } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdComment } from "react-icons/md";
import { joinSub, removePostFromFeed } from "../../Redux/Actions";
import relativeTime from "dayjs/plugin/relativeTime";

type IProps = {
  match: {
    params: {
      id: string;
    };
  };
  history: {
    push: Function;
    goBack: Function;
  };
} & IClass &
  IReduxProps;

interface IState {
  postData: IExpandedPost | null;
}

class ExpandedPost extends Component<IProps, IState> {
  postId: string;
  constructor(props: IProps) {
    super(props);
    this.postId = props.match.params.id;

    this.state = {
      postData: null
    };
  }

  componentDidMount() {
    dayjs.extend(relativeTime);

    getPostById(this.postId)
      .then((response) => {
        if (response.statusCode === STATUS_SUCCESS) {
          this.setState({
            postData: response.data
          });
        } else {
          this.props.history.push(RouteNames.notFound);
        }
      })
      .catch(() => this.props.history.push(RouteNames.notFound));
  }

  preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  handleImageOrLinkClick = () =>
    window.open(
      this.state.postData?.Link || this.state.postData?.Image,
      "_blank"
    );

  onDelete = async () => {
    const { statusCode } = await deletePostById(this.state.postData?.ID || "");

    if (statusCode === STATUS_SUCCESS) {
      removePostFromFeed(this.state.postData?.ID || "");
      //   !!deleteCallback && deleteCallback();
    }
  };

  onJoin = (subName: string) => {
    if (this.props.isAuthenticated) {
      joinSub(subName);
      //   setToast(true);

      //   setTimeout(() => setToast(false), 3000);
    } else {
      this.props.history.push({
        pathname: RouteNames.login,
        state: { heading: "Login to join subreaddits you like!" }
      });
    }
  };

  onBack = () => this.props.history.goBack();

  render() {
    const { postData } = this.state;
    const { classes, joinedSubs, userId } = this.props;
    const cumulativeVotes =
      (postData?.Upvotes || 0) - (postData?.Downvotes || 0);

    return (
      <Container className={classes.wrapper}>
        <Grid container>
          <Grid item xs={12} sm={1}>
            <IconButton onClick={this.onBack}>
              <IoIosArrowRoundBack color={WHITE} size={"3rem"} />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={11}>
            <React.Fragment>
              {!!postData ? (
                <Paper className={classes.container}>
                  <Box className={classes.upvoteSection}>
                    <VotesSection
                      cumulativeVotes={cumulativeVotes}
                      postId={postData?.ID || ""}
                    />
                  </Box>
                  <Box className={classes.contentSection}>
                    <Box className={classes.titleSection} style={{ flex: 1 }}>
                      <Typography
                        className={classes.subName}
                        color={"textPrimary"}
                        component={RouterLink}
                        to={`${RouteNames.sub}/${postData?.Sub}`}
                      >
                        b/{postData?.Sub}
                      </Typography>
                      <Hidden xsDown>
                        <Typography className={classes.postedText}>
                          posted by
                        </Typography>
                      </Hidden>
                      <Avatar
                        url={postData?.User?.Avatar || ""}
                        size={"xs"}
                        style={{ margin: "0 0.3rem" }}
                      />
                      <Typography
                        className={classes.userNameText}
                        component={RouterLink}
                        to={`${RouteNames.user}/${postData?.User?.UserName}`}
                      >
                        u/{postData?.User?.UserName || ""}
                      </Typography>
                      <Typography className={classes.postedText}>
                        {dayjs(postData?.CreatedAt).fromNow()}
                      </Typography>
                      {!joinedSubs?.includes(postData?.Sub || "") &&
                        (postData?.User?.UserName || "") !== userId && (
                          <Button
                            size={"small"}
                            variant={"outlined"}
                            color={"inherit"}
                            onClick={() => this.onJoin(postData?.Sub || "")}
                            startIcon={<FaPlus size={10} />}
                            className={classes.joinButton}
                          >
                            JOIN
                          </Button>
                        )}
                      {(postData?.User?.UserName || "") === userId && (
                        <DeletePostButton
                          className={classes.joinButton}
                          onDelete={this.onDelete}
                        />
                      )}
                    </Box>
                    <Box className={classes.flexContainer} style={{ flex: 5 }}>
                      <Box className={classes.textDetailsContainer}>
                        <Typography
                          variant={"h6"}
                          color={"textPrimary"}
                          style={{ marginTop: "1vh" }}
                        >
                          {postData?.Title}
                        </Typography>
                        {!!postData?.Link ? (
                          <React.Fragment>
                            <Box
                              className={classes.flexContainer}
                              style={{ marginTop: "2vh", flexDirection: "row" }}
                            >
                              <GoLink style={{ marginRight: "1rem" }} />
                              <MuiLink
                                href={postData?.Link}
                                onClick={this.preventDefault}
                                style={{ color: LIGHT_BLUE }}
                              >
                                {postData?.Link}
                              </MuiLink>
                            </Box>
                            {!!postData?.Link && (
                              <Box className={classes.imageDetailContainer}>
                                <Box
                                  className={classes.urlContainer}
                                  style={{
                                    backgroundColor: SEMI_GREY,
                                    backgroundSize: "cover"
                                  }}
                                  onClick={this.handleImageOrLinkClick}
                                >
                                  <FaLink size={50} color={BLUE} />
                                </Box>
                              </Box>
                            )}
                          </React.Fragment>
                        ) : (
                          <Typography
                            variant={"body1"}
                            color={"textPrimary"}
                            style={{ marginTop: "1vh" }}
                          >
                            {postData?.Content}
                          </Typography>
                        )}
                      </Box>
                      {!!postData?.Image && (
                        <img
                          src={postData?.Image}
                          className={classes.imageContainer}
                          alt={"beautiful bread"}
                        />
                      )}
                    </Box>
                    <Box
                      style={{ flex: 0.7 }}
                      className={classes.bottomBarContainer}
                    >
                      <Box
                        style={{ flex: 1 }}
                        className={classes.bottomBarElement}
                      >
                        <MdComment size={25} />
                        <Typography
                          color={"textPrimary"}
                          className={classes.bottomBarText}
                        >
                          {postData?.Comments?.length || 0} comments
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ) : (
                <PostSkeleton height={"30rem"} />
              )}
              <Grid item xs={12}>
                <CommentBox
                  ID={this.props.match.params.id}
                  isAuthenticated={this.props.isAuthenticated}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "2rem" }}>
                {postData?.Comments?.map((comment) => (
                  <CommentCard {...comment} />
                ))}
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(ExpandedPost);
