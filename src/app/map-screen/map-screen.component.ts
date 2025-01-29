import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  inject,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
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
  @Output() addNewData = new EventEmitter<Place>();

  private _placeList: Place[] = [];
  public get placeList(): Place[] {
    return this._placeList;
  }
  @Input()
  public set placeList(response: any) {
    this._placeList = response.map(
      (item: any) =>
        new Place(
          item.id,
          item.type,
          item.title,
          item.description,
          [item.y, item.x],
          item.average_rate
        )
    );
  }

  constructor() {}
  private map: any;
  private marker = L.marker([52.06, 19.25]);

  addNewPlace = false;
  newPlacePosition: [number,number] = [0, 0];
  newPlaceTitle = "";
  onTitleInputChange(event:Event){
    this.newPlaceTitle = (event.target as HTMLInputElement).value;
  }
  newPlaceDescription = "";
  onDescriptionInputChange(event:Event){
    this.newPlaceDescription = (event.target as HTMLInputElement).value;
  }
  newPlaceType = "Atrakcja"
  onTypeSelectChange(event:Event){
    this.newPlaceType = (event.target as HTMLInputElement).value;
  }

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

  addPlaceInterface() {
    this.addNewPlace = true;
    this.map.on('click', (e: any) => {
      this.addPlaceUpdatePostion(e.latlng);
    });
  }

  public addPlaceUpdatePostion(position: L.LatLng): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.map.panTo(position);
    this.marker = L.marker([position.lat, position.lng]).addTo(this.map);
    this.marker.bindPopup('Twoje nowe miejsce znajduje się tutaj!').openPopup();

    this.newPlacePosition = [position.lat, position.lng];
    console.log(this.newPlacePosition);
  }

  addPlaceSendForm() {
    this.addNewPlace = false;
    this.addNewData.emit(new Place(0, this.newPlaceType, this.newPlaceTitle, this.newPlaceDescription, this.newPlacePosition, 5))
  }
}
