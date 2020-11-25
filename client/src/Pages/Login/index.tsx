import Login from "./container";
import { IReduxState } from "../../Redux";
import { loginUserAction } from "../../Redux/Actions";
import { connect } from "react-redux";

const mapStateToProps = (state: IReduxState) => ({});

const mapActionsToProps = {
  loginUser: loginUserAction
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;

export default connect(mapStateToProps, mapActionsToProps)(Login);
