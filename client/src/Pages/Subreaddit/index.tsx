import Subreaddit from "./container";
import { IReduxState } from "../../Redux";
import { joinSub, leaveSub } from "../../Redux/Actions/user";

import { connect } from "react-redux";

const mapStateToProps = (state: IReduxState) => ({
  user: state.user.userData,
  isAuthenticated: state.user.isAuthenticated
});

const mapActionsToProps = {
  joinSub,
  leaveSub
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;

export default connect(mapStateToProps, mapActionsToProps)(Subreaddit);
