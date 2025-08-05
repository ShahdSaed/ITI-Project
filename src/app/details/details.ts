import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule, Router } from '@angular/router';
import { MovieService, Movie } from '../services/movie.service';
import { MediaCardComponent } from '../media-card/media-card';

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
  inWatchlistIds: number[] = [];
  loading = false;
  error = '';

  watchlist = new Set<number>();
  Math: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieId = Number(params.get('id'));
      this.loadMovieDetails();
    });
  }

  loadMovieDetails(): void {
    this.loading = true;
    this.error = '';

    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
        this.loadRecommendations();
        this.starsArray = this.getStars(this.getRatingPercentage(movie.vote_average) / 10);
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
    if (this.watchlist.has(id)) {
      this.watchlist.delete(id);
    } else {
      this.watchlist.add(id);
    }
  }

  isInWatchlist(id: number): boolean {
    return this.watchlist.has(id);
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
