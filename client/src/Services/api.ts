import { ApiResponse, RawResponse } from "../Types";

export const retrieveResponse = (response: RawResponse): ApiResponse => ({
  data: response?.data || response?.error || response?.token,
  statusCode: response.statusCode
});

export const getAxiosRequestObject = (payload: any) => ({
  data: payload
});

export const getFormHeader = () => ({
  headers: { "Content-Type": `multipart/form-data` }
});

export const getFormPayload = (payloadObj: any): FormData => {
  const payload = new FormData();
  for (var key in payloadObj) payload.set(key, payloadObj[key]);

  return payload;
};
