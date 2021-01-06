import { createStyles, fade, makeStyles, Theme } from "@material-ui/core";
import { DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      display: "flex",
      backgroundColor: DARK_GREY,
      marginBottom: "1rem",
      padding: "1rem",
      transition: `${theme.transitions.create(["width", "transform"], {
        duration: theme.transitions.duration.standard
      })}`,
      "&:hover": {
        transform: "scale(1.05)",
        cursor: "pointer"
      }
    },
    title: {
      fontWeight: 700,
      textDecoration: "underline"
    },
    info: {
      fontWeight: 700,
      color: fade(SMOKEY_WHITE, 0.7)
    }
  })
);
