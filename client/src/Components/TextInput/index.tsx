import { withStyles, TextField } from "@material-ui/core";
import { BLUE_GREEN, DARK_GREY, TURQUOISE } from "../../Common/colors";

const TextInput = withStyles({
  root: {
    "& label.Mui-focused": {
      color: BLUE_GREEN
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: BLUE_GREEN
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: TURQUOISE
      },
      "&:hover fieldset": {
        borderColor: BLUE_GREEN
      },
      "&.Mui-focused fieldset": {
        borderColor: BLUE_GREEN
      },
      color: DARK_GREY
    }
  }
})(TextField);

export default TextInput;
