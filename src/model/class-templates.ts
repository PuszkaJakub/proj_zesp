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
  id: number;
  date: string;
  author: string;
  content: string;
}