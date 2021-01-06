import { createStyles } from "@material-ui/core";

const rawStyles = {
  sectionTitle: {
    margin: "5vh 0",
    fontWeight: 700,
    fontSize: "1rem"
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
