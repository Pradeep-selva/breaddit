import { createStyles } from "@material-ui/core";

const rawStyles = {
  container: {
    maxWidth: "50vw"
  },
  sectionTitle: {
    marginTop: "5vh",
    fontWeight: 700,
    fontSize: "1rem"
  },
  trending: {
    marginTop: "1.5vh"
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
