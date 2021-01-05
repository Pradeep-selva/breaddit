export interface ApiResponse {
  data?: any;
  error?: string;
  token?: string;
  statusCode: number;
}

export interface RawResponse {
  data?: string;
  error?: string;
  token?: string;
  statusCode: number;
}

export interface ISignUp {
  userName: string;
  email: string;
  password: string;
}

export interface IComment {
  Body: string;
}

export interface IUserSearchResult {
  UserName?: string;
  Avatar?: string;
  Bio?: string;
}

export interface ISubSearchResult {
  Name?: string;
  Thumbnail?: string;
  Description?: string;
}

interface Password {
  password: string;
}

interface ILoginWithUserName extends Password {
  userName: string;
}

interface ILoginWithEmail extends Password {
  email: string;
}

export type ILoginCredentials = ILoginWithEmail | ILoginWithUserName;
