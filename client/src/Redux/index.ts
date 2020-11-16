import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { feedReducer, userReducer } from "./Reducers";
// import Saga from "../Saga";
import { IFeedState, IUserState } from "../Types";

export interface IReduxState {
  user: IUserState;
  feed: IFeedState;
}

const sagaMiddleWare = createSagaMiddleware();

const initialState = {};

const reducers = combineReducers<IReduxState>({
  feed: feedReducer,
  user: userReducer
});

//   let middleware = applyMiddleware(sagaMiddleWare);

const store = createStore(reducers, initialState);
// sagaMiddleWare.run(Saga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
