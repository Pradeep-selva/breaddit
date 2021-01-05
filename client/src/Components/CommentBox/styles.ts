import { createStyles, makeStyles } from "@material-ui/core";
import { SMOKEY_WHITE } from "../../Common/colors";

export const useStyles = makeStyles(() =>
  createStyles({
    commentButton: {
      border: `1px solid ${SMOKEY_WHITE}`,
      marginTop: "10px"
    }
  })
);
