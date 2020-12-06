import { FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

interface IProps {
  value: any;
  onChange: (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  input: React.ReactElement<any, any>;
  backgroundColor: string;
  items: Array<string> | undefined;
  helperText: string;
  label: string;
}

const Dropdown = ({
  value,
  onChange,
  input,
  backgroundColor,
  items,
  helperText,
  label
}: IProps) => {
  const classes = useStyles();

  return (
    <FormControl>
      <Typography variant={"caption"} className={classes.label}>
        {label}
      </Typography>
      <Select id='dropdown' value={value} onChange={onChange} input={input}>
        <MenuItem style={{ backgroundColor }} value=''>
          <em>None</em>
        </MenuItem>
        {items?.map((item) => (
          <MenuItem style={{ backgroundColor }} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <Typography variant={"caption"} color={"error"}>
        {helperText}
      </Typography>
    </FormControl>
  );
};

export default Dropdown;
