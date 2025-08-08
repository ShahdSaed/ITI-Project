import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/movie';
  private watchListSubject: BehaviorSubject<Movie[]>;
  private watchlistCountSubject: BehaviorSubject<number>;
  public watchlist$: Observable<Movie[]>;
  public watchlistCount$: Observable<number>;

  constructor(private http: HttpClient) {
    // Initialize subjects
    const stored = localStorage.getItem('watchlist');
    const initialWatchlist = stored ? JSON.parse(stored) : [];
    
    this.watchListSubject = new BehaviorSubject<Movie[]>(initialWatchlist);
    this.watchlistCountSubject = new BehaviorSubject<number>(initialWatchlist.length);
    
    // Set up observables
    this.watchlist$ = this.watchListSubject.asObservable();
    this.watchlistCount$ = this.watchlistCountSubject.asObservable();
    
    // Synchronize count with watchlist changes
    this.watchListSubject.subscribe(watchlist => {
      this.watchlistCountSubject.next(watchlist.length);
    });
  }

  private updateState(watchlist: Movie[]): void {
    try {
      // Update storage first
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      
      // Then update state with a new array reference
      this.watchListSubject.next([...watchlist]);
      
      console.log('State updated successfully, new count:', watchlist.length);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  public updateMovie(id: number, movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  public deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public getWatchlist(): Observable<Movie[]> {
    return this.watchlist$;
  }

  public toggleWatchlist(movie: Movie): Observable<any> {
    const current = this.watchListSubject.value;
    const index = current.findIndex(m => m.id === movie.id);
    
    if (index === -1) {
      // Add movie to watchlist
      const updated = [...current, movie];
      console.log('Adding movie to watchlist:', movie.title);
      this.updateState(updated);
      return of({ message: 'Movie added to watchlist', added: true });
    } else {
      // Remove movie from watchlist
      const updated = current.filter(m => m.id !== movie.id);
      console.log('Removing movie from watchlist:', movie.title);
      this.updateState(updated);
      return of({ message: 'Movie removed from watchlist', added: false });
    }
  }

  public removeFromWatchlist(movieId: number): Observable<any> {
    const current = this.watchListSubject.value;
    if (!current.some(m => m.id === movieId)) {
      return of({ message: 'Movie not found in watchlist' });
    }
    
    const updated = current.filter(m => m.id !== movieId);
    console.log('Removing movie from watchlist, new length:', updated.length);
    this.updateState(updated);
    return of({ message: 'Movie removed from watchlist', watchlist: updated });
  }

  public isInWatchlist(movieId: number): Observable<boolean> {
    return this.watchlist$.pipe(
      map((watchlist: Movie[]) => watchlist.some(movie => movie.id === movieId))
    );
  }

  public getWatchlistCount(): Observable<number> {
    return this.watchlistCount$;
  }

  public clearWatchlist(): Observable<void> {
    console.log('Clearing watchlist');
    this.updateState([]);
    return of(void 0);
  }
}