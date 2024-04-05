import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
//import { SearchService }  from '../../../services/search-bar.service'; // Import search service


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  location: string = '';
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;
  isLoading: boolean = false; // Flag to indicate search in progress
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit() {
    // Validate form inputs if necessary

    // Redirect to search page with query parameters
    this.router.navigate(['/search'], {
      queryParams: {
        location: this.location,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        //guests: this.guests
      }
    });
  }

  
}
