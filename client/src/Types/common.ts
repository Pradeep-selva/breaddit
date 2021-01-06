export interface ISubData {
  CreatedAt: Date;
  Description: string;
  Name: string;
  Owner: string;
  Tags: Array<string>;
  Thumbnail: string;
  ThumbnailUpdatedAt: Date | null;
  UpdatedAt: Date;
  Users: Array<string>;
}

export interface IUserSearchResult {
  UserName?: string;
  Avatar?: string;
  Bio?: string;
  Breads?: number;
}

export interface ISubSearchResult {
  Name?: string;
  Thumbnail?: string;
  Description?: string;
  Members?: number;
}
