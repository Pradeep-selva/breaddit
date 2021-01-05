import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { joinSub, removePostFromFeed } from "../../Redux/Actions";
import ExpandedPost from "./container";

const mapStateToProps = (state: IReduxState) => ({
  joinedSubs: state.user.userData?.JoinedSubs,
  userId: state.user.userId,
  isAuthenticated: state.user.isAuthenticated
});

const mapActionsToProps = {
  removePostFromFeed,
  joinSub
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;

export default connect(mapStateToProps, mapActionsToProps)(ExpandedPost);
