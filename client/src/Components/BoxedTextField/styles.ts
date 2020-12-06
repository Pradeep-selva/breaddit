import {
  createStyles,
  fade,
  InputBase,
  Theme,
  withStyles
} from "@material-ui/core";
import { DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: DARK_GREY,
      border: `1px solid ${theme.palette.secondary.main}`,
      fontSize: 16,
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        boxShadow: `${fade(SMOKEY_WHITE, 0.1)} 0 0 0 0.2rem`,
        borderColor: SMOKEY_WHITE
      }
    }
  })
)(InputBase);
