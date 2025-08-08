import { Component } from '@angular/core';
import { CardGrid } from '../card-grid/card-grid';
import { SearchHeaderComponent } from '../components/search-header/search-header';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home-page',
  imports: [CardGrid, SearchHeaderComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  searchResults: Movie[] = [];

  onSearchResults(results: Movie[]): void {
    this.searchResults = results;
  }
}
