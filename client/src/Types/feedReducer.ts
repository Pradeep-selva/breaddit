export interface IPostUser {
  UserName: string;
  Avatar: string;
}

export interface IFeed {
  Title: string;
  Link: string;
  Content: string;
  Image: string;
  User: IPostUser;
  Sub: string;
  Upvotes: number;
  Comments: number;
  Downvotes: number;
  CreatedAt: Date;
}
