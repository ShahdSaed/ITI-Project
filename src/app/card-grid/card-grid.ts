import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from '../media-card/media-card';

@Component({
  selector: 'app-card-grid',
  imports: [CommonModule, MediaCardComponent],
  templateUrl: './card-grid.html',
  styleUrl: './card-grid.css'
})
export class CardGrid {
  cards = [
    {
      title: 'Inception',
      date: 'Jul 16, 2010',
      rating: 87,
      imageUrl: 'https://m.media-amazon.com/images/I/51s+zF1FQwL._AC_SY679_.jpg',
      isLiked: false
    },
    {
      title: 'Interstellar',
      date: 'Nov 07, 2014',
      rating: 91,
      imageUrl: 'https://m.media-amazon.com/images/I/71n58vBL2-L._AC_SY679_.jpg',
      isLiked: true
    },
    {
      title: 'The Dark Knight',
      date: 'Jul 18, 2008',
      rating: 94,
      imageUrl: 'https://m.media-amazon.com/images/I/51EbJjlLw-L._AC_SY679_.jpg',
      isLiked: false
    },
    {
      title: 'The Matrix',
      date: 'Mar 31, 1999',
      rating: 88,
      imageUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L.jpg',
      isLiked: true
    },
    {
      title: 'Pulp Fiction',
      date: 'Oct 14, 1994',
      rating: 92,
      imageUrl: 'https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg',
      isLiked: false
    },
    {
      title: 'Fight Club',
      date: 'Oct 15, 1999',
      rating: 89,
      imageUrl: 'https://m.media-amazon.com/images/I/81D+KJkO5-L._AC_SY679_.jpg',
      isLiked: true
    },
    {
      title: 'Forrest Gump',
      date: 'Jul 06, 1994',
      rating: 85,
      imageUrl: 'https://m.media-amazon.com/images/I/61+Q6Rh3OQL._AC_SY679_.jpg',
      isLiked: false
    },
    {
      title: 'The Shawshank Redemption',
      date: 'Sep 23, 1994',
      rating: 98,
      imageUrl: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg',
      isLiked: true
    },
    {
      title: 'The Godfather',
      date: 'Mar 24, 1972',
      rating: 97,
      imageUrl: 'https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_SY679_.jpg',
      isLiked: false
    },
    {
      title: 'Gladiator',
      date: 'May 05, 2000',
      rating: 86,
      imageUrl: 'https://m.media-amazon.com/images/I/51A9ZK0KQGL._AC_SY679_.jpg',
      isLiked: true
    }
  ];

  cardsPerPage = 10;
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  get paginationPages() {
    const pages = [];
    const total = this.totalPages;
    const current = this.currentPage;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      }
    }
    return pages;
  }

  get cardsToShow() {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(start, start + this.cardsPerPage);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
