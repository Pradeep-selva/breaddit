import { Typography } from "@material-ui/core";
import React from "react";
import { BsDot } from "react-icons/bs";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BLUE, ORANGE, SMOKEY_WHITE } from "../../Common/colors";
import { useStyles } from "./styles";
import { IProps } from "./index";

interface IVotesProps {
  cumulativeVotes: number;
  postId: string;
}

const VotesSection = ({
  cumulativeVotes,
  postId,
  upVotes,
  downVotes
}: IVotesProps & IProps) => {
  const classes = useStyles();
  const isUpVoted = upVotes?.find((item) => item.PostId === postId);
  const isDownVoted = downVotes?.find((item) => item.PostId === postId);

  return (
    <React.Fragment>
      <ImArrowUp
        className={classes.container}
        color={isUpVoted ? ORANGE : SMOKEY_WHITE}
      />
      {cumulativeVotes === 0 ? (
        <BsDot color={SMOKEY_WHITE} />
      ) : (
        <Typography>{cumulativeVotes}</Typography>
      )}
      <ImArrowDown color={isDownVoted ? BLUE : SMOKEY_WHITE} />
    </React.Fragment>
  );
};

export default VotesSection;
