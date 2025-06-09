import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  constructor() {}

  ngAfterViewInit() {
    this.initMap();
  }

  private map: any;
  private marker = L.marker([52.06, 19.25]);

  addNewPlace = false;
  newPlacePosition: [number, number] = [0, 0];

  @Output() addPlaceUpdate = new EventEmitter<[number, number]>();


  private initMap(): void {
    this.map = L.map('map', {
      center: [52.06, 19.25],
      zoom: 7,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addPlaceInterface() {
    if(this.map){
      this.addNewPlace = true;
      this.map.on('click', (e: any) => {
        this.addPlaceUpdatePostion(e.latlng);
      });
    }
  }

  public addPlaceUpdatePostion(position: L.LatLng): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.map.panTo(position);
    this.marker = L.marker([position.lat, position.lng]).addTo(this.map);
    this.marker.bindPopup('Twoje nowe miejsce znajduje się tutaj!').openPopup();
    this.newPlacePosition = [position.lat, position.lng];
    this.addPlaceUpdate.emit(this.newPlacePosition);
  }


  centerMap(coords: [number, number]) {
    // this.map.setView(coords);
    // this.map.setZoom(20);
    // this.map.removeLayer(this.marker);
    // this.marker = L.marker(coords).addTo(this.map);
    // this.marker.bindPopup('To tutaj!').openPopup();
  }

}
