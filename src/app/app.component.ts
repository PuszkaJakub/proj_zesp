import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { TouristApiService } from './tourist-api.service';
import { AddPlaceComponent } from './add-place/add-place.component';
import { IPlace } from '../model/class-templates';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartScreenComponent, MapScreenComponent, AddPlaceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = "kamperyNG"
  constructor(private touristApi: TouristApiService) {}
  placeListInfo: any=[];
  screen = 'map-screen'

  fetchData() {
    this.touristApi.getPins().subscribe((response) =>{
      this.placeListInfo = response;
    });
  }

  sendData(place: any){
    this.touristApi.addPin(place).subscribe((response) =>{
      console.log(response);
    });
  }

  screenChange(screen: string) {
    this.screen = screen;
  }

  showPlace(place: IPlace){

  }


}
