import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  inject,
} from '@angular/core';
import * as L from 'leaflet';

class Place {
  id: number;
  type: string;
  title: string;
  description: string;
  coords: [number, number];
  rate: number;

  constructor(
    id: number,
    type: string,
    title: string,
    description: string,
    coords: [number, number],
    rate: number
  ) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.description = description;
    this.coords = coords;
    this.rate = rate;
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

  private _placeList: Place[] = [];
  public get placeList(): Place[] {
    return this._placeList;
  }
  @Input()
  public set placeList(response: any) {
    this._placeList = response.map((item:any) => 
      new Place(item.id, item.type, item.title, item.description, [item.y, item.x], item.average_rate)
    );
    // for (const item of response) {
    //   this._placeList.push(new Place(item.id, item.type, item.title, item.description, [item.y, item.x], item.average_rate));
    //   // console.log(item)
    // }
  }

  constructor() {}
  private map: any;
  private marker = L.marker([52.06, 19.25]);

  addNewPlace = false;

  ngOnInit() {
    this.callForData.emit();
    this.initMap();
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [52.06, 19.25], // Set map center
      zoom: 7, // Set zoom level
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

 
    // L.marker(this.placeList.coords).addTo(this.map)
  }

  centerMap(coords: [number, number]) {
    this.map.setView(coords);
    this.map.setZoom(20);
    this.map.removeLayer(this.marker);
    this.marker = L.marker(coords).addTo(this.map);
    this.marker.bindPopup('To tutaj!').openPopup();
  }

  alamakota(){
    console.log(this.placeList)
  }
}
