export const BASE_URL = "https://breadddit.el.r.appspot.com";

export const DEPLOYED_URL = window.location.origin;

export const VERSION = "v1";

export const ENDPOINTS = {
  //auth endpoints
  login: "/login",
  signup: "/signup",
  //utility endpoints
  search: (query) => `/search?q=${query}`,
  //user endpoints
  user: "/user",
  userById: (id) => `/users/${id}`,
  publicUserPosts: (id) => `/users/${id}/posts`,
  userUpvotes: "/user/upvotes",
  userDownvotes: "/user/downvotes",
  userNotifications: "/user/notifications",
  //sub endpoints,
  sub: "/sub",
  subById: (id) => `/sub/${id}`,
  publicSubPosts: (id) => `/sub/${id}/posts`,
  joinSub: (id) => `/sub/${id}/join`,
  leaveSub: (id) => `/sub/${id}/leave`,
  //post endpoints
  postById: (id) => `/posts/${id}`,
  postToSub: (id) => `/sub/${id}/post`,
  upvotePost: (id) => `/posts/${id}/upvote`,
  downvotePost: (id) => `/posts/${id}/downvote`,
  commentOnPost: (id) => `/posts/${id}/comment`,
  //feed
  publicFeed: "/feed/public",
  trendingFeed: "/feed/trending",
  privateFeed: "/feed/private"
};
