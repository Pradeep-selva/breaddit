import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { SMOKEY_WHITE } from "../../Common/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      color: SMOKEY_WHITE
    }
  })
);
