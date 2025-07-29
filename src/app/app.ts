import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CircularRatingComponent } from './circular-rating/circular-rating';
import { HomePage } from './home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CircularRatingComponent, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
