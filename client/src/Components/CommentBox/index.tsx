import React from "react";
import { Button } from "@material-ui/core";
import { BoxedTextField } from "..";
import { useStyles } from "./styles";
import { commentOnPost } from "../../APIs";
import { useHistory } from "react-router";
import { RouteNames } from "../../Configs";

interface IProps {
  ID: string;
  isAuthenticated: boolean;
}

const CommentBox = ({ ID, isAuthenticated }: IProps) => {
  const MAX_LENGTH = 200;
  const classes = useStyles();
  const history = useHistory();
  const [comment, setComment] = React.useState("");
  const [errors, setErrors] = React.useState<string | null>(null);

  const onSubmit = () => {
    isAuthenticated
      ? comment.length <= MAX_LENGTH
        ? commentOnPost(ID, { Body: comment })
            .then(() => history.go(0))
            .catch(() => setErrors("An error occurred"))
        : setErrors("Too many characters entered")
      : history.push({
          pathname: RouteNames.login,
          state: { heading: "Login to comment!" }
        });
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement> &
      React.FormEvent<HTMLDivElement> &
      React.FormEvent<HTMLLabelElement>
  ) => setComment(event.target.value as string);

  return (
    <React.Fragment>
      <BoxedTextField
        multiline
        autoFocus
        rows={5}
        label={"Whats your thoughts on this bread?"}
        style={{ minWidth: "100%" }}
        helperText={errors}
        textCount={MAX_LENGTH - comment.length}
        onChange={onChange}
        textCountStyle={{ color: 200 - comment.length > 0 ? "green" : "red" }}
      />
      <Button
        variant={"outlined"}
        className={classes.commentButton}
        onClick={onSubmit}
      >
        Comment
      </Button>
    </React.Fragment>
  );
};

export default CommentBox;
