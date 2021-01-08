import { createStyles } from "@material-ui/core";
import { ImageURLS } from "../../Assets";
import { BLACK } from "../../Common/colors";
import theme from "../../Theme";

const rawStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: "15vh",
    [theme.breakpoints.down("xs")]: {
      marginTop: "5vh"
    }
  },
  loginIllustration: {
    background: `url(${ImageURLS.loginBackground})`,
    backgroundSize: "cover"
  },
  loginContainer: {
    padding: "5%"
  },
  title: {
    fontWeight: 700,
    marginBottom: "2%"
  },
  subTitle: {
    fontSize: "0.8rem",
    maxWidth: "80%",
    marginBottom: "20%"
  },
  formField: {
    marginBottom: "4%",
    width: "75%"
  },
  checkbox: {
    marginBottom: "4%",
    color: BLACK
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
