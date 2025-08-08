import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from '../media-card/media-card';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-card-grid',
  imports: [CommonModule, MediaCardComponent],
  templateUrl: './card-grid.html',
  styleUrl: './card-grid.css'
})
export class CardGrid implements OnInit {
  @Input() searchResults: Movie[] = [];
  
  cards: Movie[] = [];
  cardsPerPage = 10;
  currentPage = 1;
  loading = false;
  error = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  isMovieLiked(movieId: number): boolean {
    return this.movieService.getWatchlistCount() > 0 && 
           this.movieService.watchList.some(movie => movie.id === movieId);
  }

  refreshCards(): void {
    this.cards = [...this.cards];
  }

  ngOnChanges(): void {
    if (this.searchResults && this.searchResults.length > 0) {
      this.cards = this.searchResults;
      this.currentPage = 1; 
    } else if (this.searchResults && this.searchResults.length === 0) {
      this.cards = [];
    }
  }

  loadMovies(): void {
    this.loading = true;
    this.error = '';
    
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.cards = movies;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load movies. Please try again.';
        this.loading = false;
        console.error('Error loading movies:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  }

  getImageUrl(posterPath: string): string {
    if (!posterPath) {
      return 'https://via.placeholder.com/300x450?text=No+Image';
    }
    if (posterPath.startsWith('http')) {
      return posterPath;
    }
    const cleanPath = posterPath.startsWith('/') ? posterPath.substring(1) : posterPath;
    return `https://image.tmdb.org/t/p/w500/${cleanPath}`;
  }

  getRatingPercentage(voteAverage: number): number {
    return Math.round(voteAverage * 10);
  }

  get totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  get cardsToShow(): Movie[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return this.cards.slice(startIndex, endIndex);
  }

  get paginationPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
