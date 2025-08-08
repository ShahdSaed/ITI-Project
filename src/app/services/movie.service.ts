import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movie'; 
  watchList: Movie[] = [];
  
  constructor(private http: HttpClient) { 
    this.loadWatchlistFromStorage();
  }

  private loadWatchlistFromStorage(): void {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      try {
        this.watchList = JSON.parse(stored);
        console.log('Watchlist loaded from storage:', this.watchList.length, 'movies');
      } catch (error) {
        console.error('Error loading watchlist from storage:', error);
        this.watchList = [];
      }
    }
  }

  private saveWatchlistToStorage(): void {
    try {
      localStorage.setItem('watchlist', JSON.stringify(this.watchList));
      console.log('Watchlist saved to storage');
    } catch (error) {
      console.error('Error saving watchlist to storage:', error);
    }
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(id: number, movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getWatchlist(): Observable<Movie[]> {
    return of(this.watchList);
  }

  addToWatchlist(movie: Movie): Observable<Movie> {
    const existingIndex = this.watchList.findIndex(m => m.id === movie.id);
    if (existingIndex === -1) {
      this.watchList.push(movie);
      this.saveWatchlistToStorage();
      console.log('Movie added to local watchlist:', movie.title);
    }
    return of(movie);
  }

  removeFromWatchlist(movieId: number): Observable<any> {
    const index = this.watchList.findIndex(m => m.id === movieId);
    if (index !== -1) {
      const removedMovie = this.watchList.splice(index, 1)[0];
      this.saveWatchlistToStorage();
      console.log('Movie removed from local watchlist:', removedMovie.title);
    }
    return of({ message: 'Movie removed from watchlist' });
  }

  isInWatchlist(movieId: number): Observable<boolean> {
    const isInWatchlist = this.watchList.some(m => m.id === movieId);
    return of(isInWatchlist);
  }

  toggleWatchlist(movie: Movie): Observable<any> {
    const index = this.watchList.findIndex(m => m.id === movie.id);
    
    if (index === -1) {
      this.watchList.push(movie);
      this.saveWatchlistToStorage();
      console.log('Movie added to local watchlist:', movie.title);
      return of({ message: 'Movie added to watchlist' });
    } else {
      const removedMovie = this.watchList.splice(index, 1)[0];
      this.saveWatchlistToStorage();
      console.log('Movie removed from local watchlist:', removedMovie.title);
      return of({ message: 'Movie removed from watchlist' });
    }
  }

  getWatchlistCount(): number {
    return this.watchList.length;
  }

  clearWatchlist(): void {
    this.watchList = [];
    this.saveWatchlistToStorage();
    console.log('Watchlist cleared');
  }
} 