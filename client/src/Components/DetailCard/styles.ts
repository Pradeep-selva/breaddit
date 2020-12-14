import { createStyles, fade, makeStyles, Theme } from "@material-ui/core";
import { LIGHT_BLACK, WHITE } from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userDetailContainer: {
      minWidth: "100%",
      minHeight: "25rem",
      marginTop: "3rem",
      borderRadius: 5,
      background:
        "linear-gradient(180deg, rgba(63,65,66,1) 12%, rgba(43,39,39,1) 30%)",
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    },
    avatar: {
      border: `7px solid ${LIGHT_BLACK}`,
      marginTop: "12%"
    },
    name: {
      fontSize: `1.3rem`,
      fontWeight: 700
    },
    subTexts: {
      fontSize: "0.75rem",
      color: fade(WHITE, 0.8)
    },
    description: {
      fontSize: "1rem",
      fontWeight: 500,
      fontStyle: "italic",
      padding: "2rem",
      textAlign: "center"
    }
  })
);
