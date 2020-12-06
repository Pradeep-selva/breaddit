import { put, takeLatest, all } from "redux-saga/effects";
import {
  clearUserData,
  loadPrivateFeed,
  loginUserAction,
  setNotificationData,
  setUserAuthenticated,
  setUserData,
  setUserDownvotes,
  setUserUpvotes,
  startLoading,
  stopLoading
} from "../Actions";
import {
  getUserData,
  getUserDownvotes,
  getUserNotifications,
  getUserUpvotes
} from "../../APIs";
import { userActionTypes } from "../types";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
// import store from "../index";

function* loginUserAndSetReduxState({
  token
}: ReturnType<typeof loginUserAction>) {
  localStorage.setItem("AuthToken", token);

  yield put(startLoading());

  const userData = yield getUserData();
  const notificationData = yield getUserNotifications();
  const upvotesData = yield getUserUpvotes();
  const downvotesData = yield getUserDownvotes();

  const didAnyFail = [userData, notificationData, upvotesData, downvotesData]
    .map((response) => response.statusCode !== STATUS_SUCCESS)
    .every((item) => item === true);

  if (didAnyFail) {
    localStorage.removeItem("AuthToken");
    yield put(clearUserData());
    window.location.href = RouteNames.home;
  } else {
    yield put(loadPrivateFeed({ limit: 25, offset: 0 }));
    yield put(setUserData(userData.data));
    yield put(setNotificationData(notificationData.data));
    yield put(setUserUpvotes(upvotesData.data));
    yield put(setUserDownvotes(downvotesData.data));
    yield put(setUserAuthenticated());
  }

  yield put(stopLoading());
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
