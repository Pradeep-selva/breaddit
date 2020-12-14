import { createStyles } from "@material-ui/core";
// import theme from "../../Theme"

const rawStyles = {
  postsTitle: {
    fontWeight: 700,
    fontSize: "1rem"
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
