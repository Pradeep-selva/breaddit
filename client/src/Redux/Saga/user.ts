import { put, takeLatest, all } from "redux-saga/effects";
import {
  clearUserData,
  loginUserAction,
  setNotificationData,
  setUserAuthenticated,
  setUserData,
  setUserDownvotes,
  setUserUpvotes
} from "../Actions";
import {
  getUserData,
  getUserDownvotes,
  getUserNotifications,
  getUserUpvotes
} from "../../APIs";
import { userActionTypes } from "../types";
// import store from "../index";

function* loginUserAndSetReduxState({
  token
}: ReturnType<typeof loginUserAction>) {
  localStorage.setItem("AuthToken", token);

  const userData = yield getUserData();
  const notificationData = yield getUserNotifications();
  const upvotesData = yield getUserUpvotes();
  const downvotesData = yield getUserDownvotes();

  yield put(setUserData(userData.data));
  yield put(setNotificationData(notificationData.data));
  yield put(setUserUpvotes(upvotesData.data));
  yield put(setUserDownvotes(downvotesData.data));
  yield put(setUserAuthenticated());
}

function* logoutUser() {
  localStorage.removeItem("AuthToken");

  yield put(clearUserData());
}

export default function* feedSaga() {
  yield all([
    takeLatest(userActionTypes.LOGIN_USER, loginUserAndSetReduxState),
    takeLatest(userActionTypes.LOGOUT_USER, logoutUser)
  ]);
}
