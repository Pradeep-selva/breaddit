export interface ApiResponse {
  data: string | undefined;
  statusCode: number;
}

export interface RawResponse {
  data?: string;
  message?: string;
  statusCode: number;
}

export interface ISignUp {
  userName: string;
  email: string;
  password: string;
}

export interface ILogin {
  userName?: string;
  email?: string;
  password: string;
}

export interface IComment {
  Body: string;
}
