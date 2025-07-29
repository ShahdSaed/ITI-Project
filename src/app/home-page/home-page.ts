import { Component } from '@angular/core';
import { CardGrid } from '../card-grid/card-grid';

@Component({
  selector: 'app-home-page',
  imports: [CardGrid],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
