import Home from "./container";
import { connect } from "react-redux";
import { IReduxState } from "../../Redux";
import { loadPublicFeed, loadPrivateFeed } from "../../Redux/Actions";

const mapStateToProps = (state: IReduxState) => ({
  trendingPosts: state.feed.trending,
  feed: state.feed.feed,
  isAuthenticated: state.user.isAuthenticated,
  loading: state.feed.loading,
  hasMoreToFetch: state.feed.hasMoreToFetch
});

const mapActionsToProps = {
  loadPublicFeed,
  loadPrivateFeed
};

export type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapActionsToProps;

export default connect(mapStateToProps, mapActionsToProps)(Home);
