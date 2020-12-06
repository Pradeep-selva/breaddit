import { createStyles, fade, makeStyles, Theme } from "@material-ui/core";
import { DARK_GREY, GREY, SMOKEY_WHITE } from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: DARK_GREY,
      height: "12rem",
      minWidth: "100%",
      marginBottom: "2vh",
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
      borderRadius: 5
    },
    contentSection: {
      padding: "1rem",
      flex: 15
    },
    subName: {
      fontWeight: 700,
      fontSize: "0.9rem",
      marginRight: "1rem"
    },
    titleSection: {
      display: "flex"
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
    }
  })
);
