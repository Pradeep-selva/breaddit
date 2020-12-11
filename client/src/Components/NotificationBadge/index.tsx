import NotificationBadge from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";

const mapStateToProps = (state: IReduxState) => ({
  notifications: state.user.notifications
});

const mapActionsToProps = {};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(NotificationBadge);
