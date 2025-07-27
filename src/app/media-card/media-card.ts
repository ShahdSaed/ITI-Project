import { Component, Input } from '@angular/core';
import { CircularRatingComponent } from '../circular-rating/circular-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.html',
  styleUrl: './media-card.css',
  imports: [CircularRatingComponent, FontAwesomeModule]
})
export class MediaCardComponent {
  @Input() title: string = 'Rick and Morty';
  @Input() date: string = 'Dec 02, 2013';
  @Input() rating: number = 87;
  @Input() imageUrl: string = 'assets/rick-morty-bg.jpg';
  @Input() isLiked: boolean = false;

  // Font Awesome icons
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }
}
