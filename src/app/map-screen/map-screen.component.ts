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
import { IPlace } from '../../model/class-templates';
import { PlaceInfoComponent } from '../place-info/place-info.component';

@Component({
  selector: 'app-map-screen',
  imports: [ReactiveFormsModule, MapComponent],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss',
})
export class MapScreenComponent implements OnInit {
  private _placeList: IPlace[] = [];
  public get placeList(): IPlace[] {
    return this._placeList;
  }
  @Input()
  public set placeList(response: any) {
    this._placeList = response;
  }

  @Output() callForData = new EventEmitter();
  @Output() callScreenChange = new EventEmitter<string>();
  @Output() callLoadPlaceInfo = new EventEmitter<IPlace>();

  @ViewChild(MapComponent) MapComponent!: MapComponent;

  addNewPlaceForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  addNewPlace = false;
  newPlacePosition: [number, number] = [0, 0];

  ngOnInit() {
    this.callForDataRequest();


    setTimeout(() => {
      this.MapComponent.addMarkers(this.placeList);
    }, 200);
  }

  callForDataRequest() {
    this.callForData.emit();
  }

  callLoadPlaceInfoRequest(place: IPlace) {
    this.callLoadPlaceInfo.emit(place);
  }

  sortPlaceList(center: L.LatLng) {
    this.placeList.sort((a, b) => {
      const distanceA = Math.hypot(
        a.coords[0] - center.lat,
        a.coords[1] - center.lng
      );
      const distanceB = Math.hypot(
        b.coords[0] - center.lat,
        b.coords[1] - center.lng
      );
      return distanceA - distanceB;
    });
  }

  sendChangeScreenRequest(screen: string) {
    this.callScreenChange.emit(screen);
  }

  sendShowPlaceInfoRequest(coords: [number, number], place: IPlace) {
    setTimeout(() => {
      this.MapComponent.centerMap(coords);
    }, 100);


  }

  findPlace(coords: L.LatLng) {
    const place = this.placeList.find(
      (place) =>
        place.coords[0] === coords.lat && place.coords[1] === coords.lng
    );

    if (place) {
      this.sendShowPlaceInfoRequest([coords.lat, coords.lng], place);
    }
  }

  getPlaceDescShort(tekst: string) {
    if (!tekst) return '';
    if (tekst.length <= 197) return tekst;
    return tekst.slice(0, 197) + '...';
  }
}
