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
      type: 'atrakcja',
      title: 'Zamek Królewski',
      description:
        'Zamek Królewski w Warszawie to historyczna rezydencja królewska, która pełniła funkcję siedziby polskich monarchów.',
      coords: [52.24783441469336, 21.015265689037438],
      rate: 4.5,
    });
  }



  sendShowPlaceRequest(place: IPlace) {
    this.callScreenChange.emit('place-screen');
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
