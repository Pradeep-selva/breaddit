import PostCard from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { removePostFromFeed } from "../../Redux/Actions/feed";

const mapStateToProps = (state: IReduxState) => ({
  joinedSubs: state.user.userData?.JoinedSubs,
  userId: state.user.userId
});

const mapActionsToProps = {
  removePostFromFeed
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(PostCard);
