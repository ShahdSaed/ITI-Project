import { Component, inject, Input } from '@angular/core';
import { CircularRatingComponent } from '../circular-rating/circular-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { Movie, MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.html',
  styleUrl: './media-card.css',
  imports: [CircularRatingComponent, FontAwesomeModule],
  providers: [MovieService]
})
export class MediaCardComponent {
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

  toggleLike() {
    this.isLiked = !this.isLiked;
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
