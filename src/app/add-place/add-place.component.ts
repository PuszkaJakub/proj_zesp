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
  @Output() addNewData = new EventEmitter();
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
    if(this.addNewPlaceForm.valid){
      this.addNewData.emit(
        {
          id: 0,
          type: this.addNewPlaceForm.get('type')?.value,
          title: this.addNewPlaceForm.get('title')?.value,
          description: this.addNewPlaceForm.get('description')?.value,
          coords: this.newPlacePosition,
          commentsAmount: 0,
        }
      );
      this.addNewPlaceForm.reset();
    }
    this.callScreenChange.emit('map-screen');
  }

  cancelAddPlace() {
    this.addNewPlaceForm.reset();
    this.callScreenChange.emit('map-screen');
  }
}
