import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TouristApiService {
  constructor(private httpClient: HttpClient) {}

  public getPins(): Observable<any>{
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }

  public addPin() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
  public getPin() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
  public addRate() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
}
