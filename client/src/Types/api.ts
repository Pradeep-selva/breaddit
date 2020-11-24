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

export interface IComment {
  Body: string;
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
