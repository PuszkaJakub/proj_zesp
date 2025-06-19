import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-place',
  imports: [MapComponent, ReactiveFormsModule],
  templateUrl: './add-place.component.html',
  styleUrl: './add-place.component.scss',
})
export class AddPlaceComponent {
  @ViewChild(MapComponent) MapComponent!: MapComponent;
  @Output() callScreenChange = new EventEmitter();

  newPlacePosition: [number, number] = [0, 0];
  placeChosen = false;

  addNewPlaceForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngAfterViewInit() {
    this.MapComponent.addPlaceInterface();
  }

  updatePlaceCoords(position: [number, number]) {
    if(!this.placeChosen){
      this.placeChosen = true;
    }
    this.newPlacePosition = position;
    console.log('Nowa pozycja:', this.newPlacePosition);
  }

  addNewPlaceSubmit() {
    console.log(this.addNewPlaceForm.get('type')?.value);
    console.log(this.addNewPlaceForm.get('title')?.value);
    console.log(this.addNewPlaceForm.get('description')?.value);
    console.log(this.newPlacePosition);

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
    this.callScreenChange.emit('map-screen');
  }

  cancelAddPlace() {
    this.callScreenChange.emit('map-screen');
  }
}
