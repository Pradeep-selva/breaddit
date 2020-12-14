export const userActionTypes = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  SET_USER_DATA: "SET_USER_DATA",
  CLEAR_USER_DATA: "CLEAR_USER_DATA",
  SET_USER_AUTHENTICATED: "SET_USER_AUTHENTICATED",
  SET_USER_UNAUTHENTICATED: "SET_USER_UNAUTHENTICATED",
  SET_NOTIFICATION_DATA: "SET_NOTIFICATION_DATA",
  MARK_NOTIFICATIONS_READ: "MARK_NOTIFICATIONS_DATA",
  SET_USER_UPVOTES: "SET_USER_UPVOTES",
  SET_USER_DOWNVOTES: "SET_USER_DOWNVOTES",
  UPVOTE_POST: "UPVOTE_POST",
  DOWNVOTE_POST: "DOWNVOTE_POST",
  START_USER_LOADING: "START_USER_LOADING",
  STOP_USER_LOADING: "STOP_USER_LOADING",
  START_UPVOTE: "START_UPVOTE",
  START_DOWNVOTE: "START_DOWNVOTE",
  JOIN_SUB: "JOIN_SUB",
  APPEND_SUB: "APPEND_SUB",
  LEAVE_SUB: "LEAVE_SUB",
  REMOVE_SUB: "REMOVE_SUB"
};

export const feedActionTypes = {
  LOAD_PUBLIC_FEED: "LOAD_PUBLIC_FEED",
  LOAD_PRIVATE_FEED: "LOAD_PRIVATE_FEED",
  SET_FEED: "SET_FEED",
  SET_TRENDING_POSTS: "SET_TRENDING_POSTS",
  CLEAR_FEED: "CLEAR_FEED",
  ADD_POST_TO_FEED: "ADD_POST_TO_FEED",
  REMOVE_POST_FROM_FEED: "REMOVE_POST_FROM_FEED",
  APPEND_POSTS_TO_FEED: "APPEND_POSTS_TO_FEED",
  START_FEED_LOADING: "START_FEED_LOADING",
  STOP_FEED_LOADING: "STOP_FEED_LOADING",
  SET_HAS_MORE_TO_FETCH: "SET_HAS_MORE_TO_FETCH"
};
