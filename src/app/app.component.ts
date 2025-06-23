import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { TouristApiService } from './tourist-api.service';
import { AddPlaceComponent } from './add-place/add-place.component';
import { IPlace } from '../model/class-templates';
import { PlaceInfoComponent } from './place-info/place-info.component';

@Component({
  selector: 'app-root',
  imports: [MapScreenComponent, AddPlaceComponent, PlaceInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = "kamperyNG"
  constructor(private touristApi: TouristApiService) {}
  placeListInfo: any=[];
  placeInfo: IPlace | null = null;
  screen = 'map-screen';

  @ViewChild(PlaceInfoComponent) PlaceInfoComponent!: PlaceInfoComponent;

  fetchData() {
    this.touristApi.getPins().subscribe((response) =>{
      this.placeListInfo = response;
    });
  }

  sendData(place: any){
    this.touristApi.addPin(place).subscribe((response) => {
      console.log(response);
      this.fetchData();
    });
  }

  screenChange(screen: string) {
    this.screen = screen;
  }

  loadPlaceInfo(place: IPlace) {
    this.placeInfo = place;
    this.screen = 'place-info';
  }
}
