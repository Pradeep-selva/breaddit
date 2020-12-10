import {
  Box,
  Grid,
  Paper,
  Typography,
  Link as MuiLink,
  Button,
  IconButton
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { IPost } from "../../Types";
import { useStyles } from "./styles";
import { GoLink } from "react-icons/go";
import VotesSection from "../VotesSection";
import { FaLink, FaPlus, FaExpand } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avatar from "../Avatar";
import { BLUE, LIGHT_BLUE, SEMI_GREY } from "../../Common/colors";
import { IProps } from "./index";
import { getTruncatedContent } from "../../Services";
import { deletePostById } from "../../APIs";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
import DeletePostButton from "../DeletePostButton";

const PostCard = ({
  Title,
  CreatedAt,
  Sub,
  User,
  Content,
  Link,
  Image,
  joinedSubs,
  Comments,
  Upvotes,
  Downvotes,
  ID,
  userId,
  isAuthenticated,
  removePostFromFeed
}: IPost & IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const cumulativeVotes = Upvotes - Downvotes;
  dayjs.extend(relativeTime);

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const handleImageOrLinkClick = () => window.open(Link || Image, "_blank");

  const onDelete = async () => {
    const { statusCode } = await deletePostById(ID);

    if (statusCode === STATUS_SUCCESS) {
      removePostFromFeed(ID);
    }
  };

  const onJoin = () => {
    if (isAuthenticated) {
      alert("Pressed join");
    } else {
      history.push({
        pathname: RouteNames.login,
        state: { heading: "Login to join subreaddits you like!" }
      });
    }
  };

  return (
    <Grid item>
      <Paper className={classes.container}>
        <Box className={classes.upvoteSection}>
          <VotesSection cumulativeVotes={cumulativeVotes} postId={ID} />
        </Box>
        <Box className={classes.contentSection}>
          <Box className={classes.titleSection} style={{ flex: 1 }}>
            <Typography
              className={classes.subName}
              color={"textPrimary"}
              component={RouterLink}
              to={"/"}
            >
              b/{Sub}
            </Typography>
            <Typography className={classes.postedText}>posted by</Typography>
            <Avatar
              url={User?.Avatar || ""}
              size={"xs"}
              style={{ margin: "0 0.3rem" }}
            />
            <Typography
              className={classes.userNameText}
              component={RouterLink}
              to={"/"}
            >
              u/{User?.UserName || ""}
            </Typography>
            <Typography className={classes.postedText}>
              {dayjs(CreatedAt).fromNow()}
            </Typography>
            {!joinedSubs?.includes(Sub) && (
              <Button
                size={"small"}
                variant={"outlined"}
                color={"inherit"}
                onClick={onJoin}
                startIcon={<FaPlus size={10} />}
                className={classes.joinButton}
              >
                JOIN
              </Button>
            )}
            {(User?.UserName || "") === userId && (
              <DeletePostButton
                className={classes.joinButton}
                onDelete={onDelete}
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
                {getTruncatedContent(Title, 145)}
              </Typography>
              {!!Link ? (
                <Box
                  className={classes.flexContainer}
                  style={{ marginTop: "2vh" }}
                >
                  <GoLink style={{ marginRight: "1rem" }} />
                  <MuiLink
                    href={Link}
                    onClick={preventDefault}
                    style={{ color: LIGHT_BLUE }}
                  >
                    {getTruncatedContent(Link, 50)}
                  </MuiLink>
                </Box>
              ) : (
                <Typography
                  variant={"body1"}
                  color={"textPrimary"}
                  style={{ marginTop: "1vh" }}
                >
                  {getTruncatedContent(Content, 100)}
                </Typography>
              )}
            </Box>
            {(!!Link || !!Image) && (
              <Box className={classes.imageDetailContainer}>
                <Box
                  className={classes.imageUrlContainer}
                  style={{
                    background: !!Image ? `url(${Image})` : "transparent",
                    backgroundColor: !!Link ? SEMI_GREY : "transparent",
                    backgroundSize: "cover"
                  }}
                  onClick={handleImageOrLinkClick}
                >
                  {!!Link && <FaLink size={50} color={BLUE} />}
                </Box>
              </Box>
            )}
          </Box>
          <Box style={{ flex: 0.7 }} className={classes.bottomBarContainer}>
            <Box style={{ flex: 1 }} className={classes.bottomBarElement}>
              <MdComment size={15} />
              <Typography
                color={"textPrimary"}
                className={classes.bottomBarText}
              >
                {Comments}
              </Typography>
            </Box>
            <Box style={{ flex: 6 }} className={classes.bottomBarElement}>
              <IconButton color={"inherit"} style={{ padding: 5 }}>
                <FaExpand size={15} />
              </IconButton>
              <Typography
                color={"textPrimary"}
                className={classes.bottomBarText}
              >
                Expand Post
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PostCard;
