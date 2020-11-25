import { ENDPOINTS } from "../Configs";
import { retrieveResponse } from "../Services/api";
import { ILoginCredentials, ISignUp, RawResponse } from "../Types";
import axios from "./axios";

export const loginUser = (payload: ILoginCredentials) =>
  axios
    .getInstance()
    .post<RawResponse>(`${ENDPOINTS.login}`, payload)
    .then((response) => retrieveResponse(response.data));

export const signUpUser = (payload: ISignUp) =>
  axios
    .getInstance()
    .post<RawResponse>(`${ENDPOINTS.signup}`, payload)
    .then((response) => retrieveResponse(response.data));
