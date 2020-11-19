import { createMuiTheme } from "@material-ui/core";

import palette from "./palette";
import typography from "./typography";

const theme = createMuiTheme({
  palette,
  typography,
  spacing: 6
});

export default theme;
