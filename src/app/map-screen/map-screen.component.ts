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
  imports: [ReactiveFormsModule, MapComponent, PlaceInfoComponent],
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
    this._placeList = response.map((item: any) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description,
      coords: [item.y, item.x],
      rate: item.average_rate,
    }));
  }

  @Output() callForData = new EventEmitter();
  @Output() callScreenChange = new EventEmitter<string>();
  @Output() callShowPlace = new EventEmitter<IPlace>();
  @Output() addNewData = new EventEmitter<IPlace>();

  @ViewChild(MapComponent) MapComponent!: MapComponent;
  @ViewChild(PlaceInfoComponent) PlaceInfoComponent!: PlaceInfoComponent;

  // Formularz do dodania nowego miejsca
  addNewPlaceForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.callForData.emit();
    this.placeList.push({
      id: 1,
      type: 'zabytek',
      title: 'Zamek Królewski',
      description:
        'Zamek Królewski w Warszawie to historyczna rezydencja królewska, która pełniła funkcję siedziby polskich monarchów.',
      coords: [52.24783441469336, 21.015265689037438],
      rate: 4.5,
    });
    this.placeList.push({
      id: 2,
      type: 'atrakcja',
      title: 'Wroclaw',
      description:
        'miasto na prawach powiatu w południowo-zachodniej Polsce, siedziba władz województwa dolnośląskiego i powiatu wrocławskiego. Położone w Europie Środkowej, na Nizinie Śląskiej, nad Odrą i czterema jej dopływami. Jest historyczną stolicą Dolnego Śląska, a także całego Śląska',
      coords: [51.0636, 17.0120],
      rate: 4.5,
    });
    this.placeList.push({
      id: 3,
      type: 'atrakcja',
      title: 'Gdańsk',
      description: 'miasto na prawach powiatu w północnej Polsce w województwie pomorskim, położone nad Morzem Bałtyckim u ujścia Motławy do Wisły nad Zatoką Gdańską, największe pod względem powierzchni miasto w kraju.',
      coords: [54.31, 18.60],
      rate: 4.5,
    });

    
    setTimeout(() => {
      this.MapComponent.addMarkers(this.placeList);
      this.PlaceInfoComponent.loadPlaceInfo(this.placeList[0]);
    }, 100);

  }

  sortPlaceList(center: L.LatLng){
    this.placeList.sort((a, b) => {
      const distanceA = Math.hypot(a.coords[0] - center.lat, a.coords[1] - center.lng);
      const distanceB = Math.hypot(b.coords[0] - center.lat, b.coords[1] - center.lng);
      return distanceA - distanceB;
    });
  }

  sendShowPlaceRequest(place: IPlace) {
    // this.callScreenChange.emit('place-screen');
    this.callShowPlace.emit(place);
    console.log('Wybrano miejsce:', place);
    console.log('Ala ma kota');
  }

  sendAddPlaceRequest() {
    this.callScreenChange.emit('add-place');
  }

  addNewPlace = false;
  newPlacePosition: [number, number] = [0, 0];

  sendShowPlaceInfoRequest(coords: [number, number], place: IPlace) {
    setTimeout(() => {
      this.MapComponent.centerMap(coords);
    }, 100);

    this.PlaceInfoComponent.loadPlaceInfo(place);
  }

  findPlace(coords: L.LatLng) {
    const place = this.placeList.find(
      (place) => place.coords[0] === coords.lat && place.coords[1] === coords.lng
    );

    if (place) {
      this.sendShowPlaceInfoRequest([coords.lat, coords.lng], place);
    }
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
