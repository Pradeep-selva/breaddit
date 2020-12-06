import { userActionTypes } from "../types";

export const loginUserAction = (token: string) => ({
  type: userActionTypes.LOGIN_USER,
  token
});

export const logoutUserAction = () => ({
  type: userActionTypes.LOGOUT_USER
});

export const setUserData = (payload: any) => ({
  type: userActionTypes.SET_USER_DATA,
  payload
});

export const clearUserData = () => ({
  type: userActionTypes.CLEAR_USER_DATA
});

export const setUserAuthenticated = () => ({
  type: userActionTypes.SET_USER_AUTHENTICATED
});

export const setUserUnauthenticated = () => ({
  type: userActionTypes.SET_USER_UNAUTHENTICATED
});

export const setNotificationData = (payload: any) => ({
  type: userActionTypes.SET_NOTIFICATION_DATA,
  payload
});

export const markNotificationsRead = () => ({
  type: userActionTypes.MARK_NOTIFICATIONS_READ
});

export const setUserUpvotes = (payload: any) => ({
  type: userActionTypes.SET_USER_UPVOTES,
  payload
});

export const setUserDownvotes = (payload: any) => ({
  type: userActionTypes.SET_USER_DOWNVOTES,
  payload
});

export const upvotePost = (id: string) => ({
  type: userActionTypes.UPVOTE_POST,
  id
});

export const downvotePost = (id: string) => ({
  type: userActionTypes.DOWNVOTE_POST,
  id
});

export const startLoading = () => ({
  type: userActionTypes.START_LOADING
});

export const stopLoading = () => ({
  type: userActionTypes.STOP_LOADING
});
