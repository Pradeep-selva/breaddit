import { createStyles, makeStyles } from "@material-ui/core";
import { DARK_GREY, LIGHT_BLACK } from "../../Common/colors";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: DARK_GREY,
      width: "100%",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      borderRadius: 5
    },
    headerContainer: {
      padding: "0.25rem 1rem",
      backgroundColor: LIGHT_BLACK,
      display: "flex",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    bodyContainer: {
      flex: 1,
      padding: "0.5rem 1rem"
    },
    name: {
      fontWeight: "bold",
      textDecoration: "underline"
    }
  })
);
