import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-screen',
  imports: [],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss'
})
export class MapScreenComponent implements OnInit{
  constructor() { }
  private map: any;

  ngOnInit(){
    import('leaflet').then(L => {
      this.initMap(L,);
    });  
  }
  private initMap(L: typeof import('leaflet'), ): void {
    this.map = L.map('map', {
      center: [51.2771824,22.509986818957067], // Set map center
      zoom: 20 // Set zoom level
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const marker = L.marker([51.2771824,22.509986818957067]).addTo(this.map);
    marker.bindPopup('Sprawdź adres!').openPopup();

    // L.marker([52.2771824,22.509986818957067]).addTo(this.map)
  }
  

  centerMap(coords: [number, number]){
    this.map.setView(coords)
  }



}
