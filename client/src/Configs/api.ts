import { PRODUCTION } from "./environment";

export const BASE_URL = PRODUCTION
  ? "https://breadddit.el.r.appspot.com"
  : "http://0.0.0.0:8080";

export const DEPLOYED_URL = window.location.origin;

export const VERSION = "v1";

export const STATUS_SUCCESS = 200;

export const ENDPOINTS = {
  //auth endpoints
  login: "/login", //done
  signup: "/signup", //done

  //utility endpoints
  search: (query: string) => `/search?q=${query}`, //done

  //user endpoints
  user: "/user", // ***UPDATE PENDING***
  userById: (id: string) => `/users/${id}`, //done
  publicUserPosts: (id: string) => `/users/${id}/posts`, //done
  userUpvotes: "/user/upvotes", //done
  userDownvotes: "/user/downvotes", //done
  userNotifications: "/user/notifications", //done

  //sub endpoints,
  sub: "/sub", //done ***UPDATE PENDING***
  subById: (id: string) => `/sub/${id}`, //done
  publicSubPosts: (id: string, offset = 0, limit = 25) =>
    `/sub/${id}/posts?limit=${limit}&offset=${offset}`, //done
  joinSub: (id: string) => `/sub/${id}/join`, //done
  leaveSub: (id: string) => `/sub/${id}/leave`, //done

  //post endpoints
  postById: (id: string) => `/posts/${id}`, //done
  postToSub: (id: string) => `/sub/${id}/post`, //done
  upvotePost: (id: string) => `/posts/${id}/upvote`, //done
  downvotePost: (id: string) => `/posts/${id}/downvote`, //done
  commentOnPost: (id: string) => `/posts/${id}/comment`, //done

  //feed
  publicFeed: (offset = 0, limit = 25) =>
    `/feed/public?limit=${limit}&offset=${offset}`, //done
  trendingFeed: `/feed/trending`, //done
  privateFeed: (offset = 0, limit = 25) =>
    `/feed/private?limit=${limit}&offset=${offset}` //done
};
