import PostCard from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { removePostFromFeed } from "../../Redux/Actions/feed";
import { joinSub } from "../../Redux/Actions/user";

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
export default connect(mapStateToProps, mapActionsToProps)(PostCard);
