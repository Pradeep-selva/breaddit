import { feedActionTypes } from "../types";

export const setFeed = (payload: any) => ({
  type: feedActionTypes.SET_FEED,
  payload
});

export const setTrendingPosts = (payload: any) => ({
  ype: feedActionTypes.SET_TRENDING_POSTS,
  payload
});
