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

export interface IUser {
  userData: IUserData;
  isAuthenticated: Boolean;
  notifications: Array<INotification>;
  upvotes: Array<IUpvoteDownvote>;
  downvotes: Array<IUpvoteDownvote>;
}
