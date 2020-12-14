import {
  Box,
  Container,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import dayjs from "dayjs";
import React, { Component } from "react";
import { RiUserLocationFill } from "react-icons/ri";
import { getUserById, getUserPosts } from "../../APIs";
import { DetailCard, PostCard, PostSkeleton } from "../../Components";
import { DEFAULT_TITLE, STATUS_SUCCESS } from "../../Configs";
import { formatNumberNotation, getTabTitle } from "../../Services";
import { IPost, IUserData } from "../../Types";
import { IProps as ReduxProps } from "./index";
import { IClass, styles } from "./styles";

interface SelfProps {
  match: {
    params: {
      [x: string]: string;
    };
  };
}

interface IState {
  offset: number;
  posts: Array<IPost>;
  hasFetched: boolean;
  userData: IUserData | null;
}

type IProps = SelfProps & IClass & ReduxProps;

class Subreaddit extends Component<IProps, IState> {
  limit: number;
  userName: string;

  constructor(props: IProps) {
    super(props);

    this.limit = 15;
    this.userName = this.props.match?.params?.id || "";

    this.state = {
      offset: 0,
      posts: [],
      userData: null,
      hasFetched: false
    };
  }

  componentDidMount() {
    document.title = getTabTitle(`u/${this.userName}`);
    this.fetchAll();
  }

  componentWillUnmount() {
    document.title = DEFAULT_TITLE;
  }

  fetchAll = () => {
    getUserById(this.userName).then(({ data, statusCode }) => {
      if (statusCode === STATUS_SUCCESS) {
        this.setState({
          userData: data
        });
      }
    });

    getUserPosts(this.userName).then(({ data, statusCode }) => {
      if (statusCode === STATUS_SUCCESS) {
        this.setState({
          posts: data as Array<IPost>,
          hasFetched: true
        });
      }
    });
  };

  render() {
    const { posts, hasFetched, userData } = this.state;
    const { classes } = this.props;

    return (
      <Container maxWidth={"md"}>
        <Grid container spacing={5} style={{ marginTop: "5vh" }}>
          <Grid item xs={12} sm={8}>
            <Typography color={"textPrimary"} className={classes.postsTitle}>
              Posts from {this.userName}
            </Typography>
            <Box style={{ marginTop: "1.5rem" }}>
              {!!posts.length ? (
                posts.map((item, index) => (
                  <PostCard
                    {...item}
                    key={index}
                    contentTruncation={60}
                    titleTruncation={120}
                  />
                ))
              ) : !hasFetched ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))
              ) : (
                <Typography variant={"h6"} color={"textPrimary"}>
                  u/{this.userName} has not posted anything yet.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            {!!userData && (
              <DetailCard
                avatar={userData.Avatar}
                name={`u/${userData.UserName}`}
                subLines={[
                  `bake day on ${dayjs(userData.CreatedAt).format("MMM DD")}`,
                  `${formatNumberNotation(Math.round(userData.Breads))} breads`,
                  userData.Status
                ]}
                description={userData.Bio}
                renderBottom={() => (
                  <Box {...{ display: "flex", justifyContent: "center" }}>
                    <RiUserLocationFill
                      style={{ marginRight: 10 }}
                      size={"1.5rem"}
                    />
                    <Typography style={{ fontWeight: 500, fontSize: "1rem" }}>
                      {userData.Location || "No dox"}
                    </Typography>
                  </Box>
                )}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(Subreaddit);
