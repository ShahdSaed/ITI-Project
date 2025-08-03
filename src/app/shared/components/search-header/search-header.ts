import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './search-header.html',
  styleUrls: ['./search-header.css']
})
export class SearchHeaderComponent {
  searchTerm = '';
  
  @Output() search = new EventEmitter<string>();

  onSearch() {
    console.log('Search for:', this.searchTerm);
  }
}
