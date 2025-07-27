import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CircularRatingComponent } from './circular-rating/circular-rating';
import { MediaCardComponent } from './media-card/media-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CircularRatingComponent, MediaCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
