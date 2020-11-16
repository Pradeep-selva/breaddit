import { feedActionTypes } from "../types";
import { IFeedState } from "../../Types";

const initialState: IFeedState = {
  feed: [],
  trending: []
};

export default function (state = { ...initialState }, action: any) {
  switch (action.type) {
    case feedActionTypes.SET_FEED:
      return {
        ...state,
        feed: action.payload
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

    default:
      return {
        ...state
      };
  }
}
