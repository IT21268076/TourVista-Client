import { HotelService } from 'src/app/services/hotel.service';
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
  noOfGuests!: number;
  roomCount!: number;
  isLoading: boolean = false; // Flag to indicate search in progress
  errorMessage: string | null = null;
  hotels: any;
  hotelImage: any[] = [];

  constructor(private router: Router, private hotelService: HotelService) {}

  ngOnInit(): void {
    this.fetchAllHotels();
  }

  onSubmit() {
    // Validate form inputs if necessary

    // Redirect to search page with query parameters
    this.router.navigate(['/search'], {
      queryParams: {
        location: this.location,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        noOfGuests: this.noOfGuests,
        roomCount: this.roomCount
      }
    });
  }

  fetchAllHotels(){
    this.hotelService.getAllHotels().subscribe(
      (response: any) => {
        this.hotels = response.data;
        console.log(this.hotels);
      }
    )
  }
  
}
