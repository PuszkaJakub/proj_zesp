import { Timestamp } from "rxjs";

export interface IPlace {
  id: number;
  type: string;
  title: string;
  description: string;
  coords: [number, number];
  rate: number;
}

export interface IComment{
  date: string;
  author: string;
  content: string;
}