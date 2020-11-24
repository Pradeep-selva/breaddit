import { all, fork } from "redux-saga/effects";
import feedSaga from "./feed";
import userSaga from "./user";

export default function* Saga() {
  yield all([fork(feedSaga)]);
  yield all([fork(userSaga)]);
}
