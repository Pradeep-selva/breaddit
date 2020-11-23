import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { DARK_GREY } from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      //   width: "30%",
      height: "20vh",
      border: `0.1px solid ${DARK_GREY}`,
      position: "relative",
      borderRadius: 10,
      overflow: "hidden"
    },
    content: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background:
        "linear-gradient(0deg, rgba(32,32,45,0.7) 37%, rgba(28,56,73,0.6) 70%)"
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: theme.spacing(2),
      textShadow:
        "-1px -1px 0 #000F, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
    }
  })
);
