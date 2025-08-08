import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';


@Component({
  selector: 'app-nav-home',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './nav-home.html',
  styleUrl: './nav-home.css'
})
export class NavHome implements OnInit {
  faHeart = faHeart;
  watchlistCount: number = 0;

  constructor(private movieService: MovieService) {}
  toggleDropdown(event: Event): void {
    event.preventDefault();
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
  }

  selectLanguage(language: string, event: Event): void {
    event.preventDefault();
    const dropdownLink = document.getElementById('navbarDropdownMenuLink');
    const dropdown = document.getElementById('languageDropdown');
    
    if (dropdownLink) {
      dropdownLink.textContent = language;
    }
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  }

  ngOnInit(): void {
    // Load initial watchlist count
    this.updateWatchlistCount();
    
    document.addEventListener('click', (event: Event) => {
      const dropdown = document.getElementById('languageDropdown');
      const dropdownToggle = document.getElementById('navbarDropdownMenuLink');
      
      if (dropdownToggle && dropdown && 
          !dropdownToggle.contains(event.target as Node) && 
          !dropdown.contains(event.target as Node)) {
        dropdown.style.display = 'none';
      }
    });
  }

  updateWatchlistCount(): void {
    this.watchlistCount = this.movieService.getWatchlistCount();
  }
}
