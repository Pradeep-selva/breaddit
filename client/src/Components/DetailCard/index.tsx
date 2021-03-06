import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import CircleAvatar from "../Avatar";
import { CreateEditSub, EditUser } from "..";
import { FormDefaultValues } from "../CreateEditSub/schema";

interface IProps {
  avatar: string;
  name: string;
  subLines: Array<string>;
  description: string;
  renderBottom: Function;
  type: "sub" | "user";
  isOwner: boolean;
  subEditFormValues?: typeof FormDefaultValues;
}

const DetailCard = ({
  avatar,
  name,
  subLines,
  description,
  renderBottom,
  isOwner,
  type,
  subEditFormValues
}: IProps) => {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);

  return (
    <React.Fragment>
      <Paper className={classes.userDetailContainer}>
        <CircleAvatar
          size={"xl"}
          url={avatar}
          className={classes.avatar}
          onEdit={isOwner ? () => setEdit(true) : undefined}
        />
        <Typography className={classes.name}>{name}</Typography>
        {subLines.map((line) => (
          <Typography className={classes.subTexts}>{line}</Typography>
        ))}
        <Typography className={classes.description}>
          " {description} "
        </Typography>
        <Box style={{ paddingTop: "1.5rem", paddingBottom: "1rem" }}>
          {renderBottom()}
        </Box>
      </Paper>
      {isOwner &&
        (type === "sub" ? (
          <CreateEditSub
            edit
            openToEdit={edit}
            closeEdit={() => setEdit(false)}
            defaultEditFormValues={subEditFormValues}
          />
        ) : (
          <EditUser openToEdit={edit} closeEdit={() => setEdit(false)} />
        ))}
    </React.Fragment>
  );
};

export default DetailCard;
