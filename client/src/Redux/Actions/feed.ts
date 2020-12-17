import { feedActionTypes } from "../types";

export const loadPublicFeed = (payload: {
  offset: number;
  limit: number;
  fetchMore?: boolean;
}) => ({
  type: feedActionTypes.LOAD_PUBLIC_FEED,
  payload
});

export const loadPrivateFeed = (payload: {
  offset: number;
  limit: number;
  fetchMore?: boolean;
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

export const addPostToFeed = (payload: any) => ({
  type: feedActionTypes.ADD_POST_TO_FEED,
  payload
});

export const removePostFromFeed = (id: string) => ({
  type: feedActionTypes.REMOVE_POST_FROM_FEED,
  id
});

export const appendPostsToFeed = (payload: any) => ({
  type: feedActionTypes.APPEND_POSTS_TO_FEED,
  payload
});

export const startFeedLoading = () => ({
  type: feedActionTypes.START_FEED_LOADING
});

export const stopFeedLoading = () => ({
  type: feedActionTypes.STOP_FEED_LOADING
});

export const setHasMoreToFetch = (payload: boolean) => ({
  type: feedActionTypes.SET_HAS_MORE_TO_FETCH,
  payload
});
