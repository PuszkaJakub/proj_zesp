import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IPlace, IComment } from '../../model/class-templates';
import { TouristApiService } from '../tourist-api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timestamp } from 'rxjs';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-place-info',
  imports: [ReactiveFormsModule, MapComponent],
  templateUrl: './place-info.component.html',
  styleUrl: './place-info.component.scss',
})
export class PlaceInfoComponent {
  private _place: IPlace | null = null;

  public get place(): IPlace | null {
    return this._place;
  }

  @Input()
  public set place(value: IPlace | null) {
    this._place = value;
    if (this._place) {
      this.touristApi.getComments(this._place.id).subscribe((response) => {
        this.comments = response;
      });
    }
  }

  comments: any = [];

  @Output() callRefresh = new EventEmitter();
  @Output() callScreenChange = new EventEmitter();

  @ViewChild(MapComponent) MapComponent!: MapComponent;

  constructor(private touristApi: TouristApiService) {console.log("krowa")
  }

  addNewCommentForm = new FormGroup({
    author: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  loadPlaceInfo() {
    console.log('dupa');
    this.MapComponent.addMarkers([this._place!]);
    this.MapComponent.centerMap(this.place!.coords);
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
      this.touristApi.addComment(newComment).subscribe((response) => {
        this.addNewCommentForm.reset();
        this.loadPlaceInfo();
      });
    }
  }

  exit() {
    this.callScreenChange.emit('map-screen');
  }
}
