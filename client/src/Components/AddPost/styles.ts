import { createStyles } from "@material-ui/core";
import { DARK_GREY } from "../../Common/colors";
import theme from "../../Theme";

const rawStyles = {
  dialogContainer: {
    backgroundColor: DARK_GREY
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
};

export const styles = () => createStyles(rawStyles);

export interface IClass {
  classes: Record<keyof typeof rawStyles, string>;
}
