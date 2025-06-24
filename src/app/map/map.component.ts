import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  private markers: L.Marker[] = [];

  addNewPlace = false;
  newPlacePosition: [number, number] = [0, 0];

  getIconByType(type: string): L.Icon {
    switch (type) {
      case 'atrakcja':
        return L.icon({
          iconUrl: '/img/atrakcja.svg',
          iconSize: [35, 35],
        });
      case 'restauracja':
        return L.icon({
          iconUrl: '/img/restauracja.svg',
          iconSize: [35, 35],
        });
      case 'widok':
        return L.icon({
          iconUrl: '/img/widok.svg',
          iconSize: [35, 35],
        });
      case 'wypoczynek':
        return L.icon({
          iconUrl: '/img/wypoczynek.svg',
          iconSize: [35, 35],
        });
      case 'zabytek':
        return L.icon({
          iconUrl: '/img/zabytek.svg',
          iconSize: [35, 35],
        });
      default:
        return L.icon({
          iconUrl: '/img/atrakcja.svg',
          iconSize: [35, 35],
        });
    }
  }

  private _places: IPlace[] | null = null;

  public get places(): IPlace[] | null {
    return this._places;
  }

  @Input()
  public set places(value: IPlace[] | null) {
    this._places = value;
    setTimeout(() => {
      this.addMarkers(this._places!);
      this.centerMap(this._places![0].coords)

    }, 200);

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
    console.log(places);
    if (!this.map) {
      console.error('Mapa nie została zainicjalizowana.');
      return;
    }
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
    places.forEach((place) => {
      const icon = this.getIconByType(place.type);
      const newMarker = L.marker(place.coords, { icon: icon }).addTo(this.map);
      console.log('Dodano marker:', newMarker);
      newMarker.bindPopup(place.title).openPopup();
      newMarker.on('click', () => {
        this.callPlaceInfo.emit(newMarker.getLatLng());
      });
      this.markers.push(newMarker);
    });
  }

  centerMap(coords: [number, number]) {
    this.map.invalidateSize();
    this.map.setView(coords, 15);
    // this.map.setZoom(17);
    this.marker.bindPopup('To tutaj!').openPopup();
  }
}
