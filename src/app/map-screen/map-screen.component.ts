import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  inject,
} from '@angular/core';
import * as L from 'leaflet';

class Pizza {
  name: string;
  number: number;
  category: string;
  price: number;

  constructor(name: string, number: number, category: string, price: number) {
    this.name = name;
    this.number = number;
    this.category = category;
    this.price = price;
  }
}

@Component({
  selector: 'app-map-screen',
  imports: [],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss',
})
export class MapScreenComponent implements OnInit {
  @Output() callForData = new EventEmitter();
  constructor() {}
  private map: any;

  ngOnInit() {
    this.callForData.emit();

    this.initMap();

  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [51.2771824, 22.509986818957067], // Set map center
      zoom: 20, // Set zoom level
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    const marker = L.marker([51.2771824, 22.509986818957067]).addTo(this.map);
    marker.bindPopup('Sprawdź adres!').openPopup();

    // L.marker([52.2771824,22.509986818957067]).addTo(this.map)
  }

  centerMap(coords: [number, number]) {
    this.map.setView(coords);
  }
}
