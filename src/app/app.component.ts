import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MapScreenComponent } from './map-screen/map-screen.component';
import { TouristApiService } from './tourist-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartScreenComponent, MapScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = "kamperyNG"
  constructor(private touristApi: TouristApiService) {}
  placeListInfo: any=[];

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
}
