import { ApiResponse, RawResponse } from "../Types";

export const retrieveResponse = (response: RawResponse): ApiResponse => ({
  data: response?.data || response?.message,
  statusCode: response.statusCode
});

export const getAxiosRequestObject = (payload: any) => ({
  data: payload
});

export const getFormHeader = () => ({
  headers: { "Content-Type": `multipart/form-data` }
});
