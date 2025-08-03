import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  movieId!: number;
  movie: any;
  recommendations: any[] = [];
  starsArray: string[] = [];
  inWatchlistIds: number[] = [];

  movies = [
    {
      id: 1,
      title: 'Black Widow',
      banner: 'https://cdn.marvel.com/content/1x/bb_payoff_dom_online_1-sht_v7_lg.jpg',
      rating: 4.5,
      votes: 8700,
      ratingperhun: 79,
      duration: 134,
      language: 'English',
      releaseYear: 'May 1,2021',
      genres: ['Action', 'Crime', 'Thriller'],
      website: 'https://www.marvel.com/movies/black-widow',
      production: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxplK_gMsis4FbZtzuXuBSq05ndDXb4fbPA&s',
      description:'Natasha Romanoff, aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.'
    },
    {
      id: 2,
      title: 'Inception',
      banner: 'https://m.media-amazon.com/images/I/912AErFSBHL._UF1000,1000_QL80_.jpg',
      rating: 3.8,
      ratingperhun: 68,
      votes: 2301,
      duration: 148,
      language: 'English',
      releaseYear: 'Jan 17,2010',
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      website: 'https://www.netflix.com/eg-en/title/70131314',
      production: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Legendary_Entertainment_logo.svg',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    },
    {
      id: 3,
      title: 'Interstellar',
      banner: 'https://www.warnerbros.it/wp-content/uploads/2024/10/Interstellar_10%C2%B0-Anniversario_Poster-Italia.jpg',
      rating: 4.0,
      ratingperhun: 83,
      votes: 9800,
      duration: 169,
      language: 'English',
      releaseYear: 'Oct 20,2014',
      genres: ['Adventure', 'Drama', 'Sci-Fi'],
      website: 'https://www.netflix.com/eg-en/title/70305903',
      production: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCXhT2eba-yk7hgsV2WHK9p3s1ID9F-V4w0A&s',
      description: ' The film delves into complex scientific ideas, love, and humanitys role in the cosmos, enhanced by Hans Zimmers score. However, some find the plot convoluted, question scientific accuracy, and criticize pacing and length. Despite these issues, Interstellar is celebrated as a significant and thought-provoking science fiction film.',
    },
    {
      id: 4,
      title: 'The Dark Knight',
      banner: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
      rating: 3.1,
      ratingperhun: 39,
      votes: 3200,
      duration: 152,
      language: 'English',
      releaseYear: 'Oct 30,2008',
      genres: ['Action', 'Thriller', 'Crime'],
      website: 'https://www.netflix.com/eg-en/title/70079583',
      production: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Syncopy_logo.svg',
      description: 'Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as "The Joker" appears in Gotham, creating a new wave of chaos. Batman s struggle against The Joker becomes deeply personal, forcing him  and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes.'
    },
    {
      id: 5,
      title: 'The Fault In Our Stars',
      banner: 'https://m.media-amazon.com/images/M/MV5BYTA4ODg5YWUtYmZiYy00Y2M4LWE0NjEtODE5MzhkYmJmZGEwXkEyXkFqcGc@._V1_.jpg',
      rating: 4.5,
      ratingperhun: 75,
      votes: 1090,
      duration: 110,
      language: 'English',
      releaseYear: 'Oct 20,2016',
      genres: ['Drama', 'Romance', 'Teenage'],
      website: 'https://www.netflix.com/eg-en/title/70298734',
      production: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzJCNSzPPQdBywy8_kAKhsdurZO4Ux1cBA9Y10lC-LnlL6MA5LaKCNnGlyJRKQlf3_is&usqp=CAU',
      description: 'Hazel and Augustus are two teenagers who share an acerbic wit, a disdain for the conventional, and a love that sweeps them on a journey. Their relationship is all the more miraculous, given that Hazel s other constant companion is an oxygen tank, Gus jokes about his prosthetic leg, and they meet and fall in love at a cancer support group.'
    },
    {
      id: 6,
      title: 'Me Before You',
      banner: 'https://m.media-amazon.com/images/M/MV5BZTFjMTAzZmYtM2JiNi00ZDlhLWFiMmMtMWMzM2U4NzkxMjE5XkEyXkFqcGc@._V1_.jpg',
      rating: 4.4,
      ratingperhun: 85,
      votes: 1090,
      duration: 110,
      language: 'English',
      releaseYear: 'Oct 20,2016',
      genres: ['Emotional', 'Drama', 'Romance'],
      website:'https://www.netflix.com/eg-en/title/80043744',
      production: 'https://upload.wikimedia.org/wikipedia/ar/0/04/New_Line_Cinema.svg',
      description: 'Lou Clark knows lots of things. She knows how many footsteps there are between the bus stop and home. What Lou does not know is she is about to lose her job or that knowing whats coming is what keeps her sane. Will Traynor knows a road accident took away his desire to live. He knows everything feels very small. What Will does not know is that Lou is about to burst into his world in a riot of color. And neither of them knows they are going to change each other for all time.',
    }
  ];

  watchlist = new Set<number>();
  Math: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.movieId = Number(params.get('id'));
      this.movie = this.movies.find(m => m.id === this.movieId);
      this.loadRecommendations();
      this.starsArray = this.getStars(this.movie.rating);
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


  loadRecommendations() {
    if (!this.movie) {
      this.recommendations = [];
      return;
    }
    this.recommendations = this.movies.filter(m =>
      m.id !== this.movieId &&
      m.genres.some(g => this.movie.genres.includes(g))
    );
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
  for (let i = 0; i < emptyStars ; i++) {
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


}
