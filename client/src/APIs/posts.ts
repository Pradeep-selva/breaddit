import { ENDPOINTS } from "../Configs";
import { getFormHeader, retrieveResponse } from "../Services/api";
import { RawResponse, IComment } from "../Types";
import axios from "./axios";

export const addPostToSub = (id: string, payload: FormData) =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.postToSub(id), payload, getFormHeader())
    .then((response) => retrieveResponse(response.data));

export const getPostById = (id: string) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.postById(id))
    .then((response) => retrieveResponse(response.data));

export const deletePostById = (id: string) =>
  axios
    .getInstance()
    .delete<RawResponse>(ENDPOINTS.postById(id))
    .then((response) => retrieveResponse(response.data));

export const upvotePost = (id: string) =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.upvotePost(id))
    .then((response) => retrieveResponse(response.data));

export const downvotePost = (id: string) =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.downvotePost(id))
    .then((response) => retrieveResponse(response.data));

export const CommentOnPost = (id: string, payload: IComment) =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.commentOnPost(id), payload)
    .then((response) => retrieveResponse(response.data));
