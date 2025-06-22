import { Component } from '@angular/core';
import { IPlace, IComment } from '../../model/class-templates';

@Component({
  selector: 'app-place-info',
  imports: [],
  templateUrl: './place-info.component.html',
  styleUrl: './place-info.component.scss',
})
export class PlaceInfoComponent {
  place: IPlace | null = null;
  comments: IComment[] = [];

  loadPlaceInfo(place: IPlace) {
    this.place = place;
    this.comments = [];
    this.comments.push({
      date: '12.03.2025',
      author: 'Alicja',
      content: 'Polecam to miejsce bo jest wporzo',
    });

    this.comments.push({
      date: '25.04.2025',
      author: 'Kot',
      content: 'Bylem tam i okazało się zaskakująco dobre, polecam wszystkim',
    });
  }
}
