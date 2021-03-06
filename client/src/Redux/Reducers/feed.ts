import { feedActionTypes } from "../types";
import { IFeedState } from "../../Types";

const initialState: IFeedState = {
  feed: [],
  trending: [],
  loading: false,
  hasMoreToFetch: true
};

export default function feed(state = { ...initialState }, action: any) {
  switch (action.type) {
    case feedActionTypes.SET_FEED:
      return {
        ...state,
        feed: action.payload
      };

    case feedActionTypes.APPEND_POSTS_TO_FEED:
      return {
        ...state,
        feed: [...state.feed, ...action.payload]
      };

    case feedActionTypes.CLEAR_FEED:
      return {
        ...state,
        feed: []
      };

    case feedActionTypes.SET_TRENDING_POSTS:
      return {
        ...state,
        trending: action.payload
      };

    case feedActionTypes.ADD_POST_TO_FEED:
      return {
        ...state,
        feed: [action.payload, ...state.feed]
      };

    case feedActionTypes.REMOVE_POST_FROM_FEED:
      let feed = state.feed.filter((item) => item.ID !== action.id);

      return {
        ...state,
        feed
      };

    case feedActionTypes.START_FEED_LOADING:
      return {
        ...state,
        loading: true
      };

    case feedActionTypes.STOP_FEED_LOADING:
      return {
        ...state,
        loading: false
      };

    case feedActionTypes.SET_HAS_MORE_TO_FETCH:
      return {
        ...state,
        hasMoreToFetch: action.payload
      };

    default:
      return {
        ...state
      };
  }
}
