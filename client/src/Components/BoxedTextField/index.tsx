import {
  FormControl,
  InputLabel,
  FormControlProps,
  InputLabelProps,
  TextFieldProps,
  Typography
} from "@material-ui/core";
import React from "react";
import { SMOKEY_WHITE } from "../../Common/colors";
import { BoxedInput } from "./styles";

interface IProps {
  textColor?: string;
  label: string;
  style?: React.CSSProperties;
}

const BoxedTextField = ({
  fullWidth,
  id,
  textColor,
  label,
  type,
  placeholder,
  color,
  onChange,
  onSubmit,
  helperText,
  error,
  value,
  rows,
  style
}: FormControlProps & InputLabelProps & TextFieldProps & IProps) => (
  <FormControl fullWidth={fullWidth} style={style}>
    <InputLabel
      shrink
      htmlFor={id}
      style={{ color: textColor || SMOKEY_WHITE }}
    >
      {label}
    </InputLabel>
    <BoxedInput
      {...{
        fullWidth,
        id,
        type,
        placeholder,
        color,
        onChange,
        onSubmit,
        value,
        helperText,
        rows,
        multiline: !!rows
      }}
    />
    <Typography variant={"caption"} color={"error"}>
      {helperText}
    </Typography>
  </FormControl>
);

export default BoxedTextField;
