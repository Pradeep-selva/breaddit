import { ENDPOINTS } from "../Configs";
import { getFormHeader, retrieveResponse } from "../Services/api";
import { RawResponse } from "../Types";
import axios from "./axios";

export const getUserData = () =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.user)
    .then((response) => retrieveResponse(response.data));

export const updateUserData = (payload: FormData) =>
  axios
    .getInstance()
    .put<RawResponse>(ENDPOINTS.user, payload, getFormHeader())
    .then((response) => retrieveResponse(response.data));

export const deactivateUser = () =>
  axios
    .getInstance()
    .delete<RawResponse>(ENDPOINTS.user)
    .then((response) => retrieveResponse(response.data));

export const getUserById = (id: string) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.userById(id))
    .then((response) => retrieveResponse(response.data));

export const getUserPosts = (id: string) =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.publicUserPosts(id))
    .then((response) => retrieveResponse(response.data));

export const getUserUpvotes = () =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.userUpvotes)
    .then((response) => retrieveResponse(response.data));

export const getUserDownvotes = () =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.userDownvotes)
    .then((response) => retrieveResponse(response.data));

export const getUserNotifications = () =>
  axios
    .getInstance()
    .get<RawResponse>(ENDPOINTS.userNotifications)
    .then((response) => retrieveResponse(response.data));

export const setUserNotificationsSeen = () =>
  axios
    .getInstance()
    .post<RawResponse>(ENDPOINTS.userNotifications)
    .then((response) => retrieveResponse(response.data));
