import NotificationBadge from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { markNotificationsRead } from "../../Redux/Actions/user";

const mapStateToProps = (state: IReduxState) => ({
  notifications: state.user.notifications
});

const mapActionsToProps = {
  markNotificationsRead
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;
export default connect(mapStateToProps, mapActionsToProps)(NotificationBadge);
