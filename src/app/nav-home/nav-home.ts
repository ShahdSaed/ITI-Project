import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-nav-home',
  imports: [FontAwesomeModule],
  templateUrl: './nav-home.html',
  styleUrl: './nav-home.css'
})
export class NavHome {
  faHeart = faHeart;
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
}
