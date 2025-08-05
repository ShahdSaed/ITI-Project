import { Component } from '@angular/core';
import { CardGrid } from '../card-grid/card-grid';
import { SearchHeaderComponent } from '../search-header/search-header';
import { NavHome } from '../nav-home/nav-home';
import { Movie } from '../services/movie.service';

@Component({
  selector: 'app-home-page',
  imports: [CardGrid, SearchHeaderComponent, NavHome],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  searchResults: Movie[] = [];

  onSearchResults(results: Movie[]): void {
    this.searchResults = results;
  }
}
