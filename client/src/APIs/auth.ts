import { ENDPOINTS } from "../Configs";
import { getAxiosRequestObject, retrieveResponse } from "../Services/api";
import { ILogin, ISignUp, RawResponse } from "../Types";
import axios from "./axios";

export const loginUser = (payload: ILogin) =>
  axios
    .getInstance()
    .get<RawResponse>(`${ENDPOINTS.login}`, getAxiosRequestObject(payload))
    .then((response) => retrieveResponse(response.data));

export const signUpUser = (payload: ISignUp) =>
  axios
    .getInstance()
    .get<RawResponse>(`${ENDPOINTS.signup}`, getAxiosRequestObject(payload))
    .then((response) => retrieveResponse(response.data));
