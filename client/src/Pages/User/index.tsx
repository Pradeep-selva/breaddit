import Subreaddit from "./container";
import { IReduxState } from "../../Redux";
import { connect } from "react-redux";

const mapStateToProps = (state: IReduxState) => ({
  user: state.user.userData
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;

export default connect(mapStateToProps, mapActionsToProps)(Subreaddit);
