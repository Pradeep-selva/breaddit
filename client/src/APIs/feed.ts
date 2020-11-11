import { ENDPOINTS } from "../Configs";
import { retrieveResponse } from "../Services/api";
import { RawResponse } from "../Types";
import axios from "./axios";

export const searchKeyword = (query: string) =>
  axios
    .getInstance()
    .get<RawResponse>(`${ENDPOINTS.search}${query}`)
    .then((response) => retrieveResponse(response.data));

export const getPublicFeed = (offset = 0, limit = 25) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.publicFeed(offset, limit))
    .then((response) => retrieveResponse(response.data));

export const getPrivateFeed = (offset = 0, limit = 25) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.privateFeed(offset, limit))
    .then((response) => retrieveResponse(response.data));

export const getTrendingFeed = () =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.trendingFeed)
    .then((response) => retrieveResponse(response.data));
