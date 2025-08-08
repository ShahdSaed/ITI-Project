import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { MediaCardComponent } from '../media-card/media-card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watch-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MediaCardComponent],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css'
})
export class WatchList implements OnInit, OnDestroy {
  movies: Movie[] = [];
  loading = false;
  error = '';
  private watchlistSubscription?: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = '';

    // Subscribe to watchlist changes
    this.watchlistSubscription = this.movieService.watchlist$.subscribe({
      next: (movies) => {
        console.log('Watchlist updated:', movies.length, 'movies');
        this.movies = [...movies]; // Force new array reference
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading watchlist:', error);
        this.loading = false;
        this.error = 'Failed to load watchlist';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

  removeFromWatchlist(movieId: number) {
    this.movieService.removeFromWatchlist(movieId).subscribe({
      next: (response) => {
        console.log(response.message);
        // The watchlist$ subscription will automatically update the UI
      },
      error: (error) => {
        console.error('Error removing movie from watchlist:', error);
        this.error = 'Failed to remove movie from watchlist';
      }
    });
  }


  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }
    return stars;
  }

  getPopularityStars(popularity: number): number {
    const maxPopularity = 1000;
    const normalizedPopularity = Math.min(popularity / maxPopularity * 5, 5);
    return Math.round(normalizedPopularity * 2) / 2; // Round to nearest 0.5
  }

  starsArray(): number[] {
    return Array(5);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getRatingPercentage(voteAverage: number): number {
    return Math.round(voteAverage * 10);
  }

  getImageUrl(posterPath: string): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/400x600?text=No+Image';
    }

    if (posterPath.startsWith('http')) {
      return posterPath;
    }

    const cleanPath = posterPath.startsWith('/') ? posterPath.substring(1) : posterPath;
    return `https://image.tmdb.org/t/p/w500/${cleanPath}`;
  }

  goHome() {
    console.log('Navigating to home page');
  }
}
