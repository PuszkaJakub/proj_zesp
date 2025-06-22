import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlace } from '../model/class-templates';

@Injectable({
  providedIn: 'root',
})
export class TouristApiService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl = 'https://tourist.visoft.dev'; // Adres API

  public getPins(){
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }

  public addPin(place: IPlace): Observable<any> {
    
    return this.httpClient.post(`${this.apiUrl}/add_pin`, place, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public getComments(id: number) {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }

  public addComment() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
}
