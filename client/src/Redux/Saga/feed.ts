import { put, takeLatest, all } from "redux-saga/effects";
import {
  loadPublicFeed,
  setTrendingPosts,
  setFeed,
  loadPrivateFeed
} from "../Actions";
import { getTrendingFeed, getPublicFeed, getPrivateFeed } from "../../APIs";
import { feedActionTypes } from "../types";
import store from "../index";

function* getAllPublicFeed({
  payload: { offset, limit }
}: ReturnType<typeof loadPublicFeed>) {
  if (!store.getState().feed.trending.length) {
    try {
      let trendingFeed = yield getTrendingFeed();
      yield put(setTrendingPosts(trendingFeed.data));
    } catch (err) {
      console.error(err);
    }
  }

  if (!store.getState().feed.feed.length) {
    try {
      let feed = yield getPublicFeed(offset, limit);
      yield put(setFeed(feed.data));
    } catch (err) {
      console.error(err);
    }
  }
}

function* getAllPrivateFeed({
  payload: { offset, limit }
}: ReturnType<typeof loadPrivateFeed>) {
  if (!store.getState().feed.trending.length) {
    try {
      let trendingFeed = yield getTrendingFeed();
      yield put(setTrendingPosts(trendingFeed.data));
    } catch (err) {
      console.error(err);
    }
  }

  try {
    let feed = yield getPrivateFeed(offset, limit);
    yield put(setFeed(feed.data));
  } catch (err) {
    console.error(err);
  }
}

export default function* feedSaga() {
  yield all([takeLatest(feedActionTypes.LOAD_PUBLIC_FEED, getAllPublicFeed)]);
  yield all([takeLatest(feedActionTypes.LOAD_PRIVATE_FEED, getAllPrivateFeed)]);
}
