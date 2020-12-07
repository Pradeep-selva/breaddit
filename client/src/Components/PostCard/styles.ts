import { createStyles, fade, makeStyles, Theme } from "@material-ui/core";
import {
  DARK_GREY,
  GREY,
  LIGHT_BLUE,
  SEMI_GREY,
  SMOKEY_WHITE,
  LIGHT_BLACK
} from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: DARK_GREY,
      height: "11rem",
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
      display: "flex"
    },
    textDetailsContainer: {
      flex: 4,
      paddingLeft: "1rem",
      display: "flex",
      flexDirection: "column",
      marginRight: "2rem"
    },
    imageDetailContainer: {
      flex: 1,
      paddingRight: "1rem"
    },
    imageUrlContainer: {
      border: `1px solid ${SEMI_GREY}`,
      minWidth: "5rem",
      minHeight: "5rem",
      marginTop: "1vh",
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
    joinButton: {
      marginLeft: "50%",
      padding: 0,
      position: "absolute",
      right: "0.5rem"
    },
    bottomBarContainer: {
      backgroundColor: LIGHT_BLACK,
      display: "flex",
      paddingLeft: "1rem"
    },
    bottomBarElement: {
      display: "flex",
      alignItems: "center"
    },
    bottomBarText: {
      fontSize: "0.8rem",
      fontWeight: 700,
      marginLeft: "0.4rem"
    }
  })
);
