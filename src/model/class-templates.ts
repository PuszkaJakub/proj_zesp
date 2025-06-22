import { Timestamp } from "rxjs";

export interface IPlace {
  id: number;
  type: string;
  title: string;
  description: string;
  coords: [number, number];
  commentsAmount: number;
}

export interface IComment{
  pinId: number;
  date: string;
  author: string;
  content: string;
}