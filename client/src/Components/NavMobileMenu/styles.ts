import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionMobile: {
      display: "flex",
      marginLeft: 15,
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  })
);
