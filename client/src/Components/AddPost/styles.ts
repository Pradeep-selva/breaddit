import { createStyles, fade } from "@material-ui/core";
import { BLACK, DARK_GREY, SMOKEY_WHITE } from "../../Common/colors";
import theme from "../../Theme";

const rawStyles = {
  dialogContainer: {
    backgroundColor: BLACK
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  tabContainer: {
    marginTop: "15vh"
  },
  toolbar: {
    backgroundColor: DARK_GREY
  },
  inputContainer: {
    padding: "10vh 0"
  },
  linkInputContainer: {
    padding: "20vh 0"
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "14rem",
    backgroundColor: DARK_GREY,
    border: `1px solid ${theme.palette.secondary.main}`,
    cursor: "pointer",
    borderRadius: 3,
    marginTop: "0.5vh",
    "&:hover": {
      boxShadow: `${fade(SMOKEY_WHITE, 0.1)} 0 0 0 0.2rem`,
      borderColor: SMOKEY_WHITE
    }
  },
  imageText: {
    color: SMOKEY_WHITE
  },
  imageIcon: {
    width: "2vw",
    marginRight: "1vw"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 3,
    color: "#fff"
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
