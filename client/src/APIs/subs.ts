import { ENDPOINTS } from "../Configs";
import { getFormHeader, retrieveResponse } from "../Services/api";
import { RawResponse } from "../Types";
import axios from "./axios";

export const createSub = (payload: FormData) =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.sub, payload, getFormHeader())
    .then((response) => retrieveResponse(response.data));

export const getSubById = (id: string) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.subById(id))
    .then((response) => retrieveResponse(response.data));

export const getSubPosts = (id: string, offset = 0, limit = 25) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.publicSubPosts(id, offset, limit))
    .then((response) => retrieveResponse(response.data));

export const updateSub = (payload: FormData, id: string) =>
  axios
    .getInstance()
    .put<RawResponse>(ENDPOINTS.subById(id), payload, getFormHeader())
    .then((response) => retrieveResponse(response.data));

export const deleteSub = (payload: FormData, id: string) =>
  axios
    .getInstance()
    .delete<RawResponse>(ENDPOINTS.subById(id))
    .then((response) => retrieveResponse(response.data));

export const joinSub = (id: string) =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.joinSub(id))
    .then((response) => retrieveResponse(response.data));

export const leaveSub = (id: string) =>
  axios
    .getInstance()
    .post(ENDPOINTS.leaveSub(id))
    .then((response) => retrieveResponse(response.data));
