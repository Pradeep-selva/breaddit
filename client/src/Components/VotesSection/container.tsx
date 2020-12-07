import { IconButton, Typography } from "@material-ui/core";
import React from "react";
import { BsDot } from "react-icons/bs";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BLUE, ORANGE, SMOKEY_WHITE } from "../../Common/colors";
import { useStyles } from "./styles";
import { IProps } from "./index";
import { formatNumberNotation } from "../../Services";
import { useHistory } from "react-router";
import { RouteNames } from "../../Configs";

interface IVotesProps {
  cumulativeVotes: number;
  postId: string;
}

const VotesSection = ({
  cumulativeVotes,
  postId,
  upVotes,
  downVotes,
  startDownvote,
  startUpvote,
  isAuthenticated
}: IVotesProps & IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const isUpVoted = upVotes?.find((item) => item.PostId === postId);
  const isDownVoted = downVotes?.find((item) => item.PostId === postId);
  const [changedVote, setChangedVote] = React.useState(0);

  const handleUpvote = () => {
    if (isAuthenticated) {
      if (isUpVoted) {
        setChangedVote(changedVote - 1);
      } else if (isDownVoted) {
        setChangedVote(changedVote + 2);
      } else {
        setChangedVote(changedVote + 1);
      }
      startUpvote(postId);
    } else {
      history.push(RouteNames.login);
    }
  };

  const handleDownvote = () => {
    if (isAuthenticated) {
      if (isDownVoted) {
        setChangedVote(changedVote + 1);
      } else if (isUpVoted) {
        setChangedVote(changedVote - 2);
      } else {
        setChangedVote(changedVote - 1);
      }
      startDownvote(postId);
    } else {
      history.push(RouteNames.login);
    }
  };

  const getCumulativeVotes = () => cumulativeVotes + changedVote;

  return (
    <React.Fragment>
      <IconButton onClick={handleUpvote}>
        <ImArrowUp
          className={classes.container}
          color={isUpVoted ? ORANGE : SMOKEY_WHITE}
          size={15}
        />
      </IconButton>
      {getCumulativeVotes() === 0 ? (
        <BsDot color={SMOKEY_WHITE} />
      ) : (
        <Typography className={classes.votesText}>
          {formatNumberNotation(getCumulativeVotes())}
        </Typography>
      )}
      <IconButton onClick={handleDownvote}>
        <ImArrowDown color={isDownVoted ? BLUE : SMOKEY_WHITE} size={15} />
      </IconButton>
    </React.Fragment>
  );
};

export default VotesSection;
