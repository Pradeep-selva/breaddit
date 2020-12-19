import {
  FormControl,
  InputLabel,
  FormControlProps,
  InputLabelProps,
  TextFieldProps,
  Typography,
  Box
} from "@material-ui/core";
import React from "react";
import { SMOKEY_WHITE } from "../../Common/colors";
import { BoxedInput } from "./styles";

interface IProps {
  textColor?: string;
  label: string;
  style?: React.CSSProperties;
  textCount?: number;
  textCountStyle?: React.CSSProperties;
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
  value,
  rows,
  style,
  textCount,
  textCountStyle
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
    <Box display={"flex"}>
      <Typography variant={"caption"} color={"error"} style={{ flex: 10 }}>
        {helperText}
      </Typography>
      <Typography variant={"caption"} style={textCountStyle}>
        {textCount}
      </Typography>
    </Box>
  </FormControl>
);

export default BoxedTextField;
