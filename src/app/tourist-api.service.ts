import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TouristApiService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl = 'https://tourist.visoft.dev'; // Adres API

  public getPins(){
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }


  public addPin(place: any): Observable<any> {
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

  public getPin() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
  public addRate() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
}
