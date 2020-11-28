import Navbar from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { logoutUserAction } from "../../Redux/Actions";

const mapStateToProps = (state: IReduxState) => ({
  userData: state.user.userData,
  isAuthenticated: state.user.isAuthenticated
});

const mapActionsToProps = {
  logoutUser: logoutUserAction
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(Navbar);
