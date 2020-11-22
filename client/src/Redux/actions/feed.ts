import { feedActionTypes } from "../types";

export const loadPublicFeed = (payload: { offset: number; limit: number }) => ({
  type: feedActionTypes.LOAD_PUBLIC_FEED,
  payload
});

export const loadPrivateFeed = (payload: {
  offset: number;
  limit: number;
}) => ({
  type: feedActionTypes.LOAD_PRIVATE_FEED,
  payload
});

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
