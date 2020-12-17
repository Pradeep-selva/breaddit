import { put, all, takeEvery } from "redux-saga/effects";
import {
  loadPublicFeed,
  setTrendingPosts,
  setFeed,
  loadPrivateFeed,
  startFeedLoading,
  appendPostsToFeed,
  stopFeedLoading,
  setHasMoreToFetch
} from "../Actions";
import { getTrendingFeed, getPublicFeed, getPrivateFeed } from "../../APIs";
import { feedActionTypes } from "../types";
import store from "../index";

function* getAllPublicFeed({
  payload: { offset, limit, fetchMore }
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

      if (feed.data.length < limit) {
        yield put(setHasMoreToFetch(false));
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!!fetchMore && store.getState().feed.hasMoreToFetch) {
    try {
      yield put(startFeedLoading());
      let feed = yield getPublicFeed(offset, limit);
      yield put(appendPostsToFeed(feed.data));

      if (feed.data.length < limit) {
        yield put(setHasMoreToFetch(false));
      }
    } catch (err) {
      console.log(err);
    } finally {
      yield put(stopFeedLoading());
    }
  }
}

function* getAllPrivateFeed({
  payload: { offset, limit, fetchMore }
}: ReturnType<typeof loadPrivateFeed>) {
  if (!store.getState().feed.trending.length) {
    try {
      let trendingFeed = yield getTrendingFeed();
      yield put(setTrendingPosts(trendingFeed.data));
    } catch (err) {
      console.error(err);
    }
  }

  if (!!fetchMore) {
    if (store.getState().feed.hasMoreToFetch) {
      try {
        yield put(startFeedLoading());
        let feed = yield getPrivateFeed(offset, limit);
        yield put(appendPostsToFeed(feed.data));

        if (feed.data.length < limit) {
          yield put(setHasMoreToFetch(false));
        }
      } catch (err) {
        console.log(err);
      } finally {
        yield put(stopFeedLoading());
      }
    }
  } else {
    try {
      let feed = yield getPrivateFeed(offset, limit);
      if (!feed.data.length) feed = yield getPublicFeed(offset, limit);
      yield put(setFeed(feed.data));

      if (feed.data.length < limit) {
        yield put(setHasMoreToFetch(false));
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default function* feedSaga() {
  yield all([takeEvery(feedActionTypes.LOAD_PUBLIC_FEED, getAllPublicFeed)]);
  yield all([takeEvery(feedActionTypes.LOAD_PRIVATE_FEED, getAllPrivateFeed)]);
}
