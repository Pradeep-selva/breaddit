import { all, fork } from "redux-saga/effects";
import feedSaga from "./feed";

export default function* Saga() {
  yield all([fork(feedSaga)]);
}
