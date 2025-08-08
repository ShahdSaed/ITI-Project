import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { CircularRatingComponent } from '../components/circular-rating/circular-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-card',
  standalone: true,
  templateUrl: './media-card.html',
  styleUrls: ['./media-card.css'],
  imports: [CircularRatingComponent, FontAwesomeModule, CommonModule]
})
export class MediaCardComponent implements OnInit, OnDestroy {
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

  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  private router = inject(Router);
  private movieService = inject(MovieService);
  private watchlistSubscription?: Subscription;

  ngOnInit() {
    // Initial state sync
    this.syncWatchlistState();
  }

  ngOnDestroy() {
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
  }

  private syncWatchlistState() {
    // Subscribe to watchlist changes for real-time updates
    this.watchlistSubscription = this.movieService.watchlist$.subscribe({
      next: (watchlist) => {
        const isInWatchlist = watchlist.some(m => m.id === this.id);
        if (this.isLiked !== isInWatchlist) {
          console.log(`Updating like state for movie ${this.title} to ${isInWatchlist}`);
          this.isLiked = isInWatchlist;
        }
      },
      error: (error) => {
        console.error('Error syncing watchlist state:', error);
      }
    });
  }

  toggleLike(event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    const movieForWatchlist: Movie = this.movie.id ? this.movie : {
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

    this.movieService.toggleWatchlist(movieForWatchlist).subscribe({
      next: (response) => {
        // No need to do anything here as the watchlist$ subscription will handle the update
        console.log(response.message);
      },
      error: (error) => {
        console.error('Error toggling watchlist:', error);
      }
    });
  }

  navigateToMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }
}