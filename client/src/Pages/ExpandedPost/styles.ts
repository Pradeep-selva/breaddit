import { createStyles, fade } from "@material-ui/core";
import {
  DARK_GREY,
  GREY,
  LIGHT_BLACK,
  LIGHT_BLUE,
  SEMI_GREY,
  SMOKEY_WHITE
} from "../../Common/colors";
import theme from "../../Theme";

const rawStyles = {
  container: null,
  upvoteSection: null,
  contentSection: null,
  subName: null,
  titleSection: null,
  postedText: null,
  userNameText: null,
  flexContainer: null,
  textDetailsContainer: null,
  imageDetailContainer: null,
  urlContainer: null,
  joinButton: null,
  bottomBarContainer: null,
  bottomBarElement: null,
  bottomBarText: null,
  wrapper: null,
  imageContainer: null,
  commentButton: null
};

export const styles = () =>
  createStyles({
    wrapper: {
      maxWidth: "50%",
      marginTop: "3rem"
    },
    container: {
      backgroundColor: DARK_GREY,
      // height: "11rem",
      minWidth: "100%",
      marginBottom: "2.5vh",
      display: "flex",
      borderRadius: 5
    },
    upvoteSection: {
      backgroundColor: GREY,
      minWidth: "5%",
      minHeight: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      borderRadius: 5,
      alignItems: "center"
    },
    contentSection: {
      padding: "1rem 0rem 0rem 0",
      flex: 20,
      display: "flex",
      flexDirection: "column"
    },
    subName: {
      fontWeight: 700,
      fontSize: "0.9rem",
      marginRight: "1rem"
    },
    titleSection: {
      paddingLeft: "1rem",
      display: "flex",
      position: "relative"
    },
    postedText: {
      fontWeight: 400,
      fontSize: "0.9rem",
      color: fade(SMOKEY_WHITE, 0.3)
    },
    userNameText: {
      fontWeight: 700,
      fontSize: "0.9rem",
      color: fade(SMOKEY_WHITE, 0.3),
      marginRight: "0.3rem"
    },
    flexContainer: {
      display: "flex",
      flexDirection: "column"
    },
    textDetailsContainer: {
      paddingLeft: "1rem",
      display: "flex",
      flexDirection: "column",
      marginRight: "2rem"
    },
    imageDetailContainer: {
      padding: "0 1rem 0 1rem",
      flex: 1
    },
    urlContainer: {
      border: `1px solid ${SEMI_GREY}`,
      height: "10rem",
      margin: "1vh 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      cursor: "pointer",
      transition: theme.transitions.create(["border", "transform"], {
        duration: 150
      }),
      "&:hover": {
        border: `1.5px solid ${LIGHT_BLUE}`,
        transform: "scale(1.05)"
      }
    },
    imageContainer: {
      padding: "0 1rem 0 1rem",
      maxWidth: "100%"
    },
    joinButton: {
      marginLeft: "50%",
      padding: 0,
      position: "absolute",
      right: "1rem"
    },
    bottomBarContainer: {
      backgroundColor: LIGHT_BLACK,
      display: "flex",
      paddingLeft: "1rem",
      marginTop: "1rem",
      borderBottomRightRadius: 5
    },
    bottomBarElement: {
      display: "flex",
      alignItems: "center"
    },
    bottomBarText: {
      fontSize: "0.8rem",
      fontWeight: 700,
      marginLeft: "0.4rem"
    },
    commentButton: {
      border: `1px solid ${SMOKEY_WHITE}`,
      marginTop: "10px"
    }
  });

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
