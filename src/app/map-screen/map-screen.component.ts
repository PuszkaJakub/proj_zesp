import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as L from 'leaflet';
import { MapComponent } from '../map/map.component';

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
  imports: [ReactiveFormsModule, MapComponent],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss',
})
export class MapScreenComponent implements OnInit {
  @Output() callForData = new EventEmitter();
  @Output() callScreenChange = new EventEmitter();
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

  
  constructor() {
    
  }
  @ViewChild(MapComponent) MapComponent!: MapComponent;

  // Formularz do dodania nowego miejsca
  addNewPlaceForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  sendAddPlaceRequest(){
    this.callScreenChange.emit('add-place');
  }



  addNewPlace = false;
  newPlacePosition: [number, number] = [0, 0];

  ngOnInit() {
    this.callForData.emit();

  }

  centerMap(coords: [number, number]) {
    // this.map.setView(coords);
    // this.map.setZoom(20);
    // this.map.removeLayer(this.marker);
    // this.marker = L.marker(coords).addTo(this.map);
    // this.marker.bindPopup('To tutaj!').openPopup();
  }



  addPlaceSendForm() {
    this.addNewPlace = false;
    // this.addNewData.emit(
    //   new Place(
    //     0,
    //     this.newPlaceType,
    //     this.newPlaceTitle,
    //     this.newPlaceDescription,
    //     this.newPlacePosition,
    //     5
    //   )
    // );
  }

}
