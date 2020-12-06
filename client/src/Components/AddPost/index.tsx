import AddPost from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";

const mapStateToProps = (state: IReduxState) => ({
  joinedSubs: state.user.userData?.JoinedSubs
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(AddPost);
