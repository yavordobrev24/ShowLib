import { Show } from './show';

export type Library = {
  savedShows: Show[];
  _id: string;
  _ownerId: string;
};
