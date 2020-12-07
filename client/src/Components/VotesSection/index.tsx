import VotesSection from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";

const mapStateToProps = (state: IReduxState) => ({
  upVotes: state.user.upvotes,
  downVotes: state.user.downvotes
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(VotesSection);
