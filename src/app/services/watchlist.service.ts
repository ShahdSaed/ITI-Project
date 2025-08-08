// watchlist.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistSubject = new BehaviorSubject<Movie[]>([]);
  public watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    this.watchlistSubject.next(watchlist);
  }

  getWatchlist(): Movie[] {
    return this.watchlistSubject.value;
  }

  addToWatchlist(movie: Movie) {
    const current = this.watchlistSubject.value;
    if (!current.some(m => m.id === movie.id)) {
      const updated = [...current, movie];
      localStorage.setItem('watchlist', JSON.stringify(updated));
      this.watchlistSubject.next(updated);
    }
  }

  removeFromWatchlist(movieId: number) {
    const updated = this.watchlistSubject.value.filter(m => m.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(updated));
    this.watchlistSubject.next(updated);
  }

  isInWatchlist(movieId: number): boolean {
    return this.watchlistSubject.value.some(m => m.id === movieId);
  }
}