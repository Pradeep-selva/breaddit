import { createStyles } from "@material-ui/core";
import { ImageURLS } from "../../Assets";
import { DARK_GREY } from "../../Common/colors";
// import theme from "../../Theme";

const rawStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: "15vh"
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
    fontSize: "0.7vw",
    maxWidth: "80%",
    marginBottom: "20%"
  },
  formField: {
    marginBottom: "4%",
    width: "75%"
  },
  dialogueTitle: {
    color: DARK_GREY,
    fontWeight: 700
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
