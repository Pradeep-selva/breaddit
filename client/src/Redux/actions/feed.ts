import { feedActionTypes } from "../types";

export const setFeed = (payload: any) => ({
  type: feedActionTypes.SET_FEED,
  payload
});

export const clearFeed = () => ({
  type: feedActionTypes.CLEAR_FEED
});

export const setTrendingPosts = (payload: any) => ({
  type: feedActionTypes.SET_TRENDING_POSTS,
  payload
});
