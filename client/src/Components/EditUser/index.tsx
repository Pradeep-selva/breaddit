import EditUser from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";

const mapStateToProps = (state: IReduxState) => ({
  user: state.user.userData
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(EditUser);
