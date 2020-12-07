import VotesSection from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { startUpvote, startDownvote } from "../../Redux/Actions/user";

const mapStateToProps = (state: IReduxState) => ({
  upVotes: state.user.upvotes,
  downVotes: state.user.downvotes,
  isAuthenticated: state.user.isAuthenticated
});

const mapActionsToProps = {
  startUpvote,
  startDownvote
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(VotesSection);
