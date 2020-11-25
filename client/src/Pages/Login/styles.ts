import { createStyles } from "@material-ui/core";
// import theme from "../../Theme";

const rawStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
