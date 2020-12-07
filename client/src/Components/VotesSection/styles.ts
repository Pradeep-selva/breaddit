import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "1rem"
    },
    votesText: {
      fontSize: "0.8rem",
      fontWeight: 700
    }
  })
);
