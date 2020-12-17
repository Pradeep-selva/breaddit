import { put, takeLatest, all } from "redux-saga/effects";
import {
  clearUserData,
  downvotePost,
  loadPrivateFeed,
  loadPublicFeed,
  loginUserAction,
  setNotificationData,
  setUserAuthenticated,
  setUserData,
  setUserDownvotes,
  setUserUpvotes,
  startDownvote,
  startUserLoading,
  startUpvote,
  stopUserLoading,
  upvotePost,
  joinSub,
  appendSub,
  leaveSub,
  removeSub
} from "../Actions";
import {
  getUserData,
  getUserDownvotes,
  getUserNotifications,
  getUserUpvotes,
  upvotePost as upvotePostAPI,
  downvotePost as downvotePostAPI,
  joinSub as joinSubAPI,
  leaveSub as leaveSubAPI
} from "../../APIs";
import { userActionTypes } from "../types";
import { RouteNames, STATUS_SUCCESS } from "../../Configs";
// import store from "../index";

function* loginUserAndSetReduxState({
  token
}: ReturnType<typeof loginUserAction>) {
  localStorage.setItem("AuthToken", token);

  yield put(startUserLoading());

  const userData = yield getUserData();
  let notificationData = yield getUserNotifications();
  const upvotesData = yield getUserUpvotes();
  const downvotesData = yield getUserDownvotes();

  notificationData = !Array.isArray(notificationData.data)
    ? []
    : notificationData.data;

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
    yield put(setNotificationData(notificationData));
    yield put(setUserUpvotes(upvotesData.data));
    yield put(setUserDownvotes(downvotesData.data));
    yield put(setUserAuthenticated());
  }

  yield put(stopUserLoading());
}

function* logoutUser() {
  localStorage.removeItem("AuthToken");
  yield put(clearUserData());
  yield put(loadPublicFeed({ limit: 25, offset: 0 }));
}

function* upvotePostSaga({ id }: ReturnType<typeof startUpvote>) {
  yield put(upvotePost(id));
  yield upvotePostAPI(id);
}

function* downvotePostSaga({ id }: ReturnType<typeof startDownvote>) {
  yield put(downvotePost(id));
  yield downvotePostAPI(id);
}

function* joinSubSaga({ subName }: ReturnType<typeof joinSub>) {
  yield put(appendSub(subName));
  yield joinSubAPI(subName);
}

function* leaveSubSaga({ subName }: ReturnType<typeof leaveSub>) {
  yield put(removeSub(subName));
  yield leaveSubAPI(subName);
}

export default function* feedSaga() {
  yield all([
    takeLatest(userActionTypes.LOGIN_USER, loginUserAndSetReduxState)
  ]);
  yield all([takeLatest(userActionTypes.LOGOUT_USER, logoutUser)]);
  yield all([takeLatest(userActionTypes.START_UPVOTE, upvotePostSaga)]);
  yield all([takeLatest(userActionTypes.START_DOWNVOTE, downvotePostSaga)]);
  yield all([takeLatest(userActionTypes.JOIN_SUB, joinSubSaga)]);
  yield all([takeLatest(userActionTypes.LEAVE_SUB, leaveSubSaga)]);
}
