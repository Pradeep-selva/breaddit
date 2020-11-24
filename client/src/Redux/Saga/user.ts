import { put, takeLatest, all } from "redux-saga/effects";
import {
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
  response
}: ReturnType<typeof loginUserAction>) {
  const { token } = response;
  console.log(token, "token");
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

export default function* feedSaga() {
  yield all([
    takeLatest(userActionTypes.LOGIN_USER, loginUserAndSetReduxState)
  ]);
}
