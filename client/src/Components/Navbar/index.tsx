import Navbar from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";

const mapStateToProps = (state: IReduxState) => ({
  userData: state.user.userData,
  isAuthenticated: state.user.isAuthenticated
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(Navbar);
