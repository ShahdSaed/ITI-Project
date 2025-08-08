import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MediaCardComponent } from '../media-card/media-card';
import { Movie } from '../models/movie';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MediaCardComponent],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  movieId!: number;
  movie: Movie | null = null;
  recommendations: Movie[] = [];
  starsArray: string[] = [];
  loading = false;
  error = '';
  private watchlistSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes and load movie details
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieId = Number(params.get('id'));
      this.loadMovieDetails();
    });

    // Initialize watchlist state
    this.movieService.watchlist$.subscribe(watchlist => {
      const currentInWatchlist = new Set(watchlist.map(m => m.id));
      this.inWatchlistMap.clear();
      currentInWatchlist.forEach(movieId => {
        this.inWatchlistMap.set(movieId, true);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

  loadMovieDetails(): void {
    this.loading = true;
    this.error = '';

    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
        this.loadRecommendations();
        this.starsArray = this.getStars(this.getPopularityStars(movie.popularity));
      },
      error: (error) => {
        this.error = 'Failed to load movie details. Please try again.';
        this.loading = false;
        console.error('Error loading movie details:', error);
      }
    });
  }

  loadRecommendations(): void {
    if (!this.movie) {
      this.recommendations = [];
      return;
    }

    // Load all movies and filter for recommendations
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        // Filter movies that are not the current movie and have similar genres
        this.recommendations = movies
          .filter(m => m.id !== this.movieId)
          .slice(0, 6); // Show max 6 recommendations
      },
      error: (error) => {
        console.error('Error loading recommendations:', error);
      }
    });
  }

  toggleWatchlist(id: number) {
    if (!this.movie) return;

    // Create movie object for watchlist
    const movieForWatchlist: Movie = {
      id: this.movie.id,
      title: this.movie.title,
      poster_path: this.movie.poster_path,
      release_date: this.movie.release_date,
      vote_average: this.movie.vote_average,
      vote_count: this.movie.vote_count,
      overview: this.movie.overview,
      adult: this.movie.adult,
      backdrop_path: this.movie.backdrop_path,
      genre_ids: this.movie.genre_ids,
      id_: this.movie.id_,
      original_language: this.movie.original_language,
      original_title: this.movie.original_title,
      popularity: this.movie.popularity,
      video: this.movie.video
    };

    this.movieService.toggleWatchlist(movieForWatchlist).subscribe({
      next: (response) => {
        console.log('Watchlist updated:', response.message);
      },
      error: (error) => {
        console.error('Error updating watchlist:', error);
      }
    });
  }

  private inWatchlistMap = new Map<number, boolean>();

  isInWatchlist(id: number): boolean {
    // Return cached value if available
    if (this.inWatchlistMap.has(id)) {
      return this.inWatchlistMap.get(id) || false;
    }

    // Subscribe to update if not already listening
    if (!this.watchlistSubscription) {
      this.watchlistSubscription = this.movieService.watchlist$.subscribe(watchlist => {
        // Update cache for all movies
        const currentInWatchlist = new Set(watchlist.map(m => m.id));
        this.inWatchlistMap.clear();
        currentInWatchlist.forEach(movieId => {
          this.inWatchlistMap.set(movieId, true);
        });
      });
    }

    // Return current state
    return this.inWatchlistMap.get(id) || false;
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
  
  getRatingClass(rating: number): string {
    if (rating >= 70) {
      return 'high-rating';
    } else if (rating >= 40) {
      return 'medium-rating';
    } else {
      return 'low-rating';
    }
  }

  getRatingPercentage(voteAverage: number): number {
    return Math.round(voteAverage * 10);
  }

  getPopularityStars(popularity: number): number {
    // Convert popularity to a 0-5 scale
    // Popularity can range from 0 to very high numbers
    // We'll normalize it to 0-5 scale
    const maxPopularity = 1000;
    const normalizedPopularity = Math.min(popularity / maxPopularity * 5, 5);
    return Math.round(normalizedPopularity * 2) / 2; // Round to nearest 0.5
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

  getImageUrl(posterPath: string): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/400x600?text=No+Image';
    }

    // If the poster path already starts with http, it's a full URL
    if (posterPath.startsWith('http')) {
      return posterPath;
    }

    // For TMDB poster paths, use the proper base URL
    // Remove leading slash if present
    const cleanPath = posterPath.startsWith('/') ? posterPath.substring(1) : posterPath;
    return `https://image.tmdb.org/t/p/w500/${cleanPath}`;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
