import { createStyles, Theme } from "@material-ui/core";

const rawStyles = {
  container: {
    marginTop: "10vh"
  },
  sectionTitle: {
    fontWeight: 700
  }
};

export const styles = (theme: Theme) => createStyles(rawStyles);

export type classesType = { classes: Record<keyof typeof rawStyles, string> };
