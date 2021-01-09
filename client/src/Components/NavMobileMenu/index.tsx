import { connect } from "react-redux";
import NavMobileMenu from "./container";
import { IReduxState } from "../../Redux";
import { logoutUserAction } from "../../Redux/Actions";

const mapStateToProps = (state: IReduxState) => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(NavMobileMenu);
