//user data
export interface IUserData {
  Avatar: string;
  AvatarUpdatedAt: Date;
  Bio: string;
  Breads: number;
  CreatedAt: string;
  Email: string;
  JoinedSubs: Array<string>;
  Location: string;
  Status: string;
  UpdatedAt: Date;
  UserName: Date;
}

export interface INotification {
  Content: string;
  Seen: Boolean;
  Sender: string;
  Time: Date;
}

export interface IUpvoteDownvote {
  PostId: string;
  Upvote?: string;
  UserName: string;
}

export interface IUserState {
  userData: IUserData | null;
  userId: string;
  isAuthenticated: Boolean;
  notifications: Array<INotification>;
  upvotes: Array<IUpvoteDownvote>;
  downvotes: Array<IUpvoteDownvote>;
}

//login
export interface ISuccessfulLoginResponse {
  token: string;
  statusCode: number;
}
