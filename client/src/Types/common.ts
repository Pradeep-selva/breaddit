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
