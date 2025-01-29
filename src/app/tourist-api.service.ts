import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TouristApiService {
  constructor(private httpClient: HttpClient) {}

  public getData() {
    return this.httpClient.get('https://tourist.visoft.dev/get_pins');
  }
}
