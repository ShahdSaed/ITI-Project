import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CircularRatingComponent } from '../components/circular-rating/circular-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.html',
  styleUrl: './media-card.css',
  imports: [CircularRatingComponent, FontAwesomeModule, CommonModule],
  providers: [MovieService]
})
export class MediaCardComponent implements OnInit {
  @Input() title: string = 'Rick and Morty';
  @Input() date: string = 'Dec 02, 2013';
  @Input() rating: number = 87;
  @Input() imageUrl: string = 'assets/rick-morty-bg.jpg';
  @Input() isLiked: boolean = false;
  @Input() id: number = 0;
  @Input() movie: Movie = {
    id: 0,
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id_: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  };
  
  @Output() likeChanged = new EventEmitter<void>();
  
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  private router = inject(Router);
  private movieService = inject(MovieService);

  ngOnInit() {
    // Check if movie is in watchlist when component initializes
    this.checkWatchlistStatus();
  }

  checkWatchlistStatus() {
    if (this.id) {
      this.movieService.isInWatchlist(this.id).subscribe({
        next: (isInWatchlist) => {
          this.isLiked = isInWatchlist;
        },
        error: (error) => {
          console.error('Error checking watchlist status:', error);
        }
      });
    }
  }

  toggleLike() {
    // Use movie object if available, otherwise create one
    let movieForWatchlist: Movie;
    
    if (this.movie && this.movie.id) {
      movieForWatchlist = this.movie;
    } else {
      // Create movie object for watchlist
      movieForWatchlist = {
        id: this.id,
        title: this.title,
        poster_path: this.imageUrl,
        release_date: this.date,
        vote_average: this.rating / 10,
        vote_count: 0,
        overview: '',
        adult: false,
        backdrop_path: '',
        genre_ids: [],
        id_: this.id,
        original_language: '',
        original_title: '',
        popularity: 0,
        video: false
      };
    }

    this.movieService.toggleWatchlist(movieForWatchlist).subscribe({
      next: (response) => {
        // Update local state
        this.isLiked = !this.isLiked;
        console.log('Watchlist updated:', response.message);
        // Emit event to parent component
        this.likeChanged.emit();
      },
      error: (error) => {
        console.error('Error updating watchlist:', error);
      }
    });
  }

  navigateToMovie(id: number) {
    console.log('Card clicked! Movie ID:', id);
    console.log('Navigating to:', `/movie/${id}`);
    this.router.navigate(['/movie', id]).then(() => {
      console.log('Navigation completed');
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}
