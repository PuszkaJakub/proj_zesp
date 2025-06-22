import { Component } from '@angular/core';
import { IPlace, IComment } from '../../model/class-templates';
import { TouristApiService } from '../tourist-api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-place-info',
  imports: [ReactiveFormsModule],
  templateUrl: './place-info.component.html',
  styleUrl: './place-info.component.scss',
})
export class PlaceInfoComponent {
  place: IPlace | null = null;
  comments: any = [];

  constructor(private touristApi: TouristApiService) {}

  addNewCommentForm = new FormGroup({
    author: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  loadPlaceInfo(place: IPlace) {
    this.place = place;
    this.touristApi.getComments(place.id).subscribe((response) => {
      this.comments = response;
    });
  }

  addNewCommentSubmit() {
    const now = new Date();
    const formatted =
      `${now.getDate().toString().padStart(2, '0')}.` +
      `${(now.getMonth() + 1).toString().padStart(2, '0')}.` +
      `${now.getFullYear()} ` +
      `${now.getHours().toString().padStart(2, '0')}:` +
      `${now.getMinutes().toString().padStart(2, '0')}`;

    if (this.place) {
      const author = this.addNewCommentForm.get('author')?.value ?? '';
      const content = this.addNewCommentForm.get('content')?.value ?? '';
      const newComment = {
        pinId: this.place.id,
        date: formatted,
        author: author,
        content: content,
      };
      this.touristApi.addComment(newComment);
    }
  }
}
