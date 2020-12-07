import NavbarUserButton from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { logoutUserAction } from "../../Redux/Actions";

const mapStateToProps = (state: IReduxState) => ({
  userData: state.user.userData
});

const mapActionsToProps = {
  logoutUser: logoutUserAction
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(NavbarUserButton);
