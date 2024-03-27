export type User = {
  accessToken: string;
  email: string;
  username: string;
  _id: string;
};
export type Comment = {
  _ownerId: string;
  username: string;
  content: string;
  showId: string;
  _createdOn: number;
  _id: string;
};
export type Library = {
  savedShows: Show[];
  _id: string;
  _ownerId: string;
};
export type Show = {
  _ownerId: string;
  title: string;
  type: string;
  video: string;
  description: string;
  img: string;
  _createdOn: number;
  _id: string;
};
