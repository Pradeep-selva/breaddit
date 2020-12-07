import AddPost from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { addPostToFeed } from "../../Redux/Actions/feed";

const mapStateToProps = (state: IReduxState) => ({
  joinedSubs: state.user.userData?.JoinedSubs
});

const mapActionsToProps = {
  addPostToFeed
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(AddPost);
