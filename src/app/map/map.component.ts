import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import { IPlace } from '../../model/class-templates';

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

  getIconByType(type: string): L.Icon {
    switch (type) {
      case 'atrakcja':
        return L.icon({
          iconUrl: '/img/atrakcja.svg',
          iconSize: [38, 95],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
        });
      case 'restauracja':
        return L.icon({
          iconUrl: '/img/restauracja.svg',
          iconSize: [30, 70],
          iconAnchor: [15, 70],
          popupAnchor: [0, -60],
        });
      case 'widok':
        return L.icon({
          iconUrl: '/img/widok.svg',
          iconSize: [35, 80],
          iconAnchor: [17, 80],
          popupAnchor: [0, -70],
        });
      case 'wypoczynek':
        return L.icon({
          iconUrl: '/img/wypoczynek.svg',
          iconSize: [35, 80],
          iconAnchor: [17, 80],
          popupAnchor: [0, -70],
        });
      case 'zabytek':
        return L.icon({
          iconUrl: '/img/zabytek.svg',
          iconSize: [35, 80],
          iconAnchor: [17, 80],
          popupAnchor: [0, -70],
        });
      default:
        return L.icon({
          iconUrl: '/img/atrakcja.svg',
          iconSize: [25, 60],
          iconAnchor: [12, 60],
          popupAnchor: [0, -50],
        });
    }
  }

  @Output() addPlaceUpdate = new EventEmitter<[number, number]>();
  @Output() callMapMoved = new EventEmitter<L.LatLng>();
  @Output() callPlaceInfo = new EventEmitter<L.LatLng>();

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.06, 19.25],
      zoom: 7,
    });

    this.map.on('moveend', () => {
      this.callMapMoved.emit(this.map.getCenter());
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addPlaceInterface() {
    if (this.map) {
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

  addMarkers(places: IPlace[]) {
    places.forEach((place) => {
      const icon = this.getIconByType(place.type);
      const marker = L.marker(place.coords, { icon: icon }).addTo(
        this.map
      );
      marker.bindPopup(place.title).openPopup();
      marker.on('click', () => {
        this.callPlaceInfo.emit(marker.getLatLng());
      });
    });
  }

  centerMap(coords: [number, number]) {
    this.map.invalidateSize();
    this.map.setView(coords, 17);
    // this.map.setZoom(17);
    this.marker.bindPopup('To tutaj!').openPopup();
  }
}
