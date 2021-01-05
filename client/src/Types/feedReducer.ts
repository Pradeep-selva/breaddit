export interface IPostUser {
  UserName: string;
  Avatar: string;
}

interface PostBase {
  Title: string;
  Link: string;
  Content: string;
  Image: string;
  User: IPostUser;
  Sub: string;
  Upvotes: number;
  Downvotes: number;
  CreatedAt: Date;
  ID: string;
}

export interface IPost extends PostBase {
  Comments: number;
}

export interface IExpandedPost extends PostBase {
  Comments: Array<{
    PostId: string;
    Body: string;
    CreatedAt: Date;
    CreatedBy: string;
  }>;
}

export interface IFeedState {
  feed: Array<IPost>;
  trending: Array<IPost>;
  loading: boolean;
  hasMoreToFetch: boolean;
}
