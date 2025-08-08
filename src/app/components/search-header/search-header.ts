import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './search-header.html',
  styleUrls: ['./search-header.css']
})
export class SearchHeaderComponent implements OnInit {
  searchTerm = '';
  click:boolean = false;
  movies: Movie[] = [];
  private searchSubject = new Subject<string>();
  @Output() searchResults = new EventEmitter<Movie[]>();

  constructor(private movieService: MovieService) {
    this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }
  
  ngOnInit(): void {
    this.loadAllMovies();
  }

  loadAllMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.searchResults.emit(movies); 
      },
      error: (error) => {
        console.error('Error loading movies:', error);
      }
    });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchTerm);
  }

  onSearchButtonClick(): void {
    this.click = true;
    this.performSearch(this.searchTerm);
  }

  private performSearch(searchTerm: string): void {
    if (!searchTerm.trim()) { 
      this.searchResults.emit(this.movies);
      return;
    }

    const filteredMovies = this.movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.original_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movie.overview && movie.overview.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    this.searchResults.emit(filteredMovies);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults.emit(this.movies);
  }
}
