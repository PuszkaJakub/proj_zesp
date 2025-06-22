import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment, IPlace } from '../model/class-templates';

@Injectable({
  providedIn: 'root',
})
export class TouristApiService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl = 'https://tourist.visoft.dev'; // Adres API

  public getPins(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/get_pins`);
  }

  public addPin(place: IPlace) {
    const body = {
      type: place.type,
      title: place.title,
      description: place.description,
      x: place.coords[1],
      y: place.coords[0],
    };

    return this.httpClient.post(`${this.apiUrl}/add_pin`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public getComments(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/get_comments/${id}`);
  }

  // POST http://localhost:3000/add_comment     -H "Content-Type: application/json"     -d '{
  //       "pin_id": 1,
  //       "date": "2025-06-20T12:00:00Z",
  //       "author": "Piotr",
  //       "content": "Super widok!"
  //   }'
  public addComment(comment: IComment) {
    const body = {
      pin_id: comment.pinId,
      date: comment.date,
      author: comment.author,
      content: comment.content,
    };

    return this.httpClient.post(`${this.apiUrl}/add_comment`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
