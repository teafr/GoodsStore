import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  searchTerm = '';
  isAuthenticated = false; 
  userName = 'John Doe';
  userInitials = 'JD';

  onSearch() {
    console.log('Searching for:', this.searchTerm);
    // TODO: trigger product search
  }
}
