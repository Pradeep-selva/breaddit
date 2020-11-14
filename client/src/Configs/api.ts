export const BASE_URL = "https://breadddit.el.r.appspot.com";

export const DEPLOYED_URL = window.location.origin;

export const VERSION = "v1";

export const ENDPOINTS = {
  //auth endpoints
  login: "/login",
  signup: "/signup",

  //utility endpoints
  search: (query: string) => `/search?q=${query}`,

  //user endpoints
  user: "/user",
  userById: (id: string) => `/users/${id}`,
  publicUserPosts: (id: string) => `/users/${id}/posts`,
  userUpvotes: "/user/upvotes",
  userDownvotes: "/user/downvotes",
  userNotifications: "/user/notifications",

  //sub endpoints,
  sub: "/sub",
  subById: (id: string) => `/sub/${id}`,
  publicSubPosts: (id: string, offset = 0, limit = 25) =>
    `/sub/${id}/posts?limit=${limit}&offset=${offset}`,
  joinSub: (id: string) => `/sub/${id}/join`,
  leaveSub: (id: string) => `/sub/${id}/leave`,

  //post endpoints
  postById: (id: string) => `/posts/${id}`,
  postToSub: (id: string) => `/sub/${id}/post`,
  upvotePost: (id: string) => `/posts/${id}/upvote`,
  downvotePost: (id: string) => `/posts/${id}/downvote`,
  commentOnPost: (id: string) => `/posts/${id}/comment`,

  //feed
  publicFeed: (offset = 0, limit = 25) =>
    `/feed/public?limit=${limit}&offset=${offset}`,
  trendingFeed: `/feed/trending`,
  privateFeed: (offset = 0, limit = 25) =>
    `/feed/private?limit=${limit}&offset=${offset}`
};
