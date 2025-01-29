import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MapScreenComponent } from './map-screen/map-screen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StartScreenComponent, MapScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kamperyNG';
}
