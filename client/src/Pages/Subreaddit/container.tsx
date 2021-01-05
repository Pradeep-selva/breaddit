import {
  Box,
  Button,
  Container,
  fade,
  Grid,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import dayjs from "dayjs";
import React, { Component } from "react";
import { getSubById, getSubPosts } from "../../APIs";
import { WHITE } from "../../Common/colors";
import {
  AddPost,
  DetailCard,
  PaginationContainer,
  PostCard,
  PostSkeleton,
  Avatar
} from "../../Components";
import { DEFAULT_TITLE, RouteNames, STATUS_SUCCESS } from "../../Configs";
import { formatNumberNotation, getTabTitle } from "../../Services";
import { IPost, ISubData } from "../../Types";
import { IProps as ReduxProps } from "./index";
import { IClass, styles } from "./styles";
import { ImageURLS } from "../../Assets";

interface SelfProps {
  match: {
    params: {
      [x: string]: string;
    };
  };
  history: any;
}

interface IState {
  offset: number;
  posts: Array<IPost>;
  hasMoreToFetch: boolean;
  hasFetched: boolean;
  subData: ISubData | null;
}

type IProps = SelfProps & IClass & ReduxProps;

class Subreaddit extends Component<IProps, IState> {
  limit: number;
  sub: string;

  constructor(props: IProps) {
    super(props);

    this.limit = 15;
    this.sub = this.props.match?.params?.id || "";

    this.state = {
      offset: 0,
      posts: [],
      hasMoreToFetch: true,
      hasFetched: false,
      subData: null
    };
  }

  componentDidMount() {
    document.title = getTabTitle(`b/${this.sub}`);
    this.fetchAll();
  }

  componentWillUnmount() {
    document.title = DEFAULT_TITLE;
  }

  fetchAll = () => {
    getSubById(this.sub)
      .then(({ data, statusCode }) => {
        if (statusCode === STATUS_SUCCESS) {
          this.setState({
            subData: data as ISubData
          });
        } else {
          this.props.history.push(RouteNames.notFound);
        }
      })
      .catch(() => this.props.history.push(RouteNames.notFound));

    getSubPosts(this.sub, this.state.offset, this.limit).then(
      ({ data, statusCode }) => {
        if (statusCode === STATUS_SUCCESS) {
          this.setState(
            {
              posts: data as Array<IPost>,
              hasFetched: true
            },
            () => {
              if (data?.length < this.limit) {
                this.setState({ hasMoreToFetch: false });
              }
            }
          );
        }
      }
    );
  };

  fetchMore = () => {
    if (this.state.hasMoreToFetch) {
      getSubPosts(this.sub, this.state.offset + this.limit).then(
        ({ data, statusCode }) => {
          if (statusCode === STATUS_SUCCESS) {
            this.setState(
              (state) => ({
                posts: [...state.posts, ...data],
                offset: state.offset + this.limit
              }),
              () => {
                if (data?.length < this.limit) {
                  this.setState((state) => ({ hasMoreToFetch: false }));
                }
              }
            );
          }
        }
      );
    }
  };

  joinSub = () => {
    if (this.props.isAuthenticated) {
      this.props.joinSub(this.sub);
    } else {
      this.props.history.push({
        pathname: RouteNames.login,
        state: { heading: "Login to join subreaddits you like!" }
      });
    }
  };

  leaveSub = () => {
    this.props.leaveSub(this.sub);
  };

  render() {
    const { posts, hasFetched, subData } = this.state;
    const { classes, user } = this.props;
    const isUserMember = user?.JoinedSubs.includes(this.sub);

    return (
      <PaginationContainer handlePagination={this.fetchMore}>
        <Paper
          className={classes.bannerContainer}
          style={{ position: "relative" }}
        >
          <Box className={classes.overlay} style={{ position: "absolute" }} />
          <Box
            {...{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1
            }}
          >
            <Grid container spacing={10}>
              <Grid item xs={5} direction={"column"}>
                <Avatar
                  url={subData?.Thumbnail || ImageURLS.defaultSubThumbnail}
                  size={"xl"}
                  className={classes.thumbnail}
                />
                <Typography
                  variant={"h4"}
                  color={"textPrimary"}
                  className={classes.subTitle}
                >
                  b/{this.sub}
                </Typography>
              </Grid>
              <Grid
                item
                xs={7}
                direction={"column"}
                style={{ marginTop: "5%" }}
              >
                {!!subData && (
                  <Typography variant={"body1"} align={"center"}>
                    {formatNumberNotation(subData?.Users.length)} bakers
                  </Typography>
                )}
                <Grid container>
                  <Grid item xs={6}>
                    <Button
                      variant={"contained"}
                      onClick={isUserMember ? this.leaveSub : this.joinSub}
                    >
                      {!isUserMember ? "JOIN" : "LEAVE"}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <AddPost
                      textButton
                      sub={this.sub}
                      subPageCallBack={() => this.props.history.go(0)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Container maxWidth={"md"}>
          <Grid container spacing={5} style={{ marginTop: "3vh" }}>
            <Grid item xs={12} sm={8}>
              <Box display={"flex"}>
                <Typography
                  color={"textPrimary"}
                  className={classes.postsTitle}
                  style={{ flex: 10 }}
                >
                  Posts from {this.sub}
                </Typography>
              </Box>
              <Box style={{ marginTop: "1.5rem" }}>
                {!!posts.length ? (
                  posts.map((item, index) => (
                    <PostCard
                      {...item}
                      key={index}
                      deleteCallback={() => this.props.history.go(0)}
                    />
                  ))
                ) : !hasFetched ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <PostSkeleton key={index} />
                  ))
                ) : (
                  <Typography variant={"h6"} color={"textPrimary"}>
                    b/{this.sub} has no posts yet.
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              {!!subData && (
                <DetailCard
                  avatar={subData?.Thumbnail}
                  name={`b/${subData.Name}`}
                  subLines={[
                    `baking since ${dayjs(subData.CreatedAt).format("MMM DD")}`,
                    `${
                      !!subData.Users.length
                        ? formatNumberNotation(subData.Users.length)
                        : 0
                    } bakers`
                  ]}
                  description={subData.Description}
                  renderBottom={() =>
                    !!subData.Tags?.length ? (
                      <Box
                        {...{
                          display: "flex",
                          justifyContent: "center",
                          paddingLeft: 5,
                          paddingRight: 5
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 500,
                            fontSize: "1rem",
                            marginRight: 5
                          }}
                        >
                          Tags:
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "0.9rem",
                            color: fade(WHITE, 0.9)
                          }}
                        >
                          {subData.Tags.join(", ")}
                        </Typography>
                      </Box>
                    ) : (
                      <></>
                    )
                  }
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </PaginationContainer>
    );
  }
}

export default withStyles(styles)(Subreaddit);
