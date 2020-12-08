import { createStyles, fade, makeStyles, Theme } from "@material-ui/core";
import { DARK_GREY, WHITE } from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: "none",
      fontWeight: 700
    },
    dialogContainer: {
      backgroundColor: DARK_GREY
    },
    titleText: {
      fontWeight: 700,
      color: WHITE
    },
    contentText: {
      color: fade(WHITE, 0.7)
    }
  })
);
