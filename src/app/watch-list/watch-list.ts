import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { MediaCardComponent } from '../media-card/media-card';

@Component({
  selector: 'app-watch-list',
  imports: [CommonModule, RouterModule, MediaCardComponent],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css'
})
export class WatchList implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.loading = true;
    this.error = '';

    this.movieService.getWatchlist().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
        console.log('Watchlist loaded:', movies.length, 'movies');
      },
      error: (error) => {
        this.error = 'Failed to load watchlist';
        this.loading = false;
        console.error('Error loading watchlist:', error);
      }
    });
  }

  removeFromWatchlist(movieId: number) {
    this.movieService.removeFromWatchlist(movieId).subscribe({
      next: () => {
        this.movies = this.movies.filter(movie => movie.id !== movieId);
        console.log('Movie removed from watchlist');
      },
      error: (error) => {
        console.error('Error removing from watchlist:', error);
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
