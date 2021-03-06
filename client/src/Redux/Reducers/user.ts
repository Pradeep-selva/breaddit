import { IUserData, IUserState } from "../../Types";
import { userActionTypes } from "../types";

const initialState: IUserState = {
  userData: null,
  userId: "",
  notifications: [],
  downvotes: [],
  upvotes: [],
  isAuthenticated: false,
  loading: false
};

export default function user(state = { ...initialState }, action: any) {
  switch (action.type) {
    case userActionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        userId: action.payload.UserName
      };

    case userActionTypes.CLEAR_USER_DATA:
      return {
        ...initialState
      };

    case userActionTypes.SET_USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };

    case userActionTypes.SET_USER_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };

    case userActionTypes.SET_USER_UPVOTES:
      return {
        ...state,
        upvotes: action.payload
      };

    case userActionTypes.SET_USER_DOWNVOTES:
      return {
        ...state,
        downvotes: action.payload
      };

    case userActionTypes.SET_NOTIFICATION_DATA:
      return {
        ...state,
        notifications: action.payload
      };

    case userActionTypes.MARK_NOTIFICATIONS_READ:
      return {
        ...state,
        notifications: state.notifications.map((item) => ({
          ...item,
          Seen: true
        }))
      };

    case userActionTypes.UPVOTE_POST:
      const downvotes = state.downvotes?.filter(
        (item) => item.PostId !== action.id
      );

      const upvotes = !!state.upvotes?.find((item) => item.PostId === action.id)
        ? state.upvotes.filter((item) => item.PostId !== action.id)
        : [
            ...(!!state.upvotes ? state.upvotes : []),
            {
              PostId: action.id,
              UserName: state.userId
            }
          ];
      return {
        ...state,
        upvotes,
        downvotes
      };

    case userActionTypes.DOWNVOTE_POST:
      const newUpvotes = state.upvotes?.filter(
        (item) => item.PostId !== action.id
      );

      const newDownvotes = !!state.downvotes?.find(
        (item) => item.PostId === action.id
      )
        ? state.downvotes.filter((item) => item.PostId !== action.id)
        : [
            ...(!!state.downvotes ? state.downvotes : []),
            {
              PostId: action.id,
              UserName: state.userId
            }
          ];
      return {
        ...state,
        upvotes: newUpvotes,
        downvotes: newDownvotes
      };

    case userActionTypes.APPEND_SUB:
      return {
        ...state,
        userData: {
          ...state.userData,
          JoinedSubs: [...(state.userData?.JoinedSubs || []), action.subName]
        } as IUserData
      };

    case userActionTypes.REMOVE_SUB:
      let newSubs = (state.userData?.JoinedSubs || []).filter(
        (item) => item !== action.subName
      );

      return {
        ...state,
        userData: {
          ...state.userData,
          JoinedSubs: newSubs
        }
      };

    case userActionTypes.START_USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case userActionTypes.STOP_USER_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return {
        ...state
      };
  }
}
