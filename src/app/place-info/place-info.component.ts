import { Component } from '@angular/core';
import { IPlace } from '../../model/class-templates';

@Component({
  selector: 'app-place-info',
  imports: [],
  templateUrl: './place-info.component.html',
  styleUrl: './place-info.component.scss'
})
export class PlaceInfoComponent {

  place: IPlace | null = null;


  loadPlaceInfo(place: IPlace) {
    this.place = place;
  }

}
